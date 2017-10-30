---
--- Created by admin.
--- DateTime: 2017/10/28 16:29
---

local skynet = require "skynet"
local math = require "math"
local class = require "lua_object".class
local GameAI = require "ddzAI"

local DDZ = class()

function Game:ctor()
    self.player = {}
    self.player[1] = Player.new()
    self.player[2] = Player.new()
    self.player[3] = Player.new()
    self.lordCards = {}
    self.method = "normal"


    self.player[1].nextPlayer = self.player[2]
    self.player[2].nextPlayer = self.player[3]
    self.player[3].nextPlayer = self.player[1]

    self.player[1].name = 'thisPlayer'
    self.player[2].name = 'rightPlayer'
    self.player[3].name = 'leftPlayer'

    self.thisPlayer = self.player[1]
    self.rightPlayer = self.player[2]
    self.leftPlayer = self.player[3]


    self.rightPlayer.isAI = true
    self:setUserInfo("leftPlayer" , {isAi = true , userName = "叫兽" , gender = "male" , headRes = "male1" , coin = 10000 , lordRate = 2 , lordWin = 2 , lordLose = 98 , farmerRate = 5 , farmerWin = 10 , farmerLose = 190 , like = 2 , dislike = 9999 , escape = 99999})

    self.leftPlayer.isAI = true
    self:setUserInfo("rightPlayer" , {isAi = true , userName = "如花" , gender = "female" , headRes = "female2" , coin = 8000 , lordRate = 30 , lordWin = 30 , lordLose = 70 , farmerRate = 50 , farmerWin = 50 , farmerLose = 50 , like = 2 , dislike = 3 , escape = 30})

    self:updateOwnInfo()

    self.auctionNum = 0
    self.lastGrabPlayer = nil       --最后一个抢地主玩家
    self.lordPlayer = self.thisPlayer          --地主玩家,初始化为当前玩家

    local rand = math.random(3)
    self.currentPlayer = self.player[rand]       --当前玩家，即第一个叫地主玩家
    self.hold = {cards = nil , player = nil , cardType = nil , cardValue = nil}    --当前牌桌上的牌以及出牌人

    self.winner = nil   --胜利者

    self.tipIndex = 1       --提示信息索引

    self.score = Score.new(200)

    setCardSort(-1) --重新设置手牌排序函数  -1为无癞子排序

    self.revSpringNum = nil     --地主出第一手牌后数目
    self.lastExtraType = nil    --最后一手可以加番的牌型
end

--通过名字字符串（thisPlayer、leftPlayer、rightPlayer）获得相应玩家
local function getPlayerByName(game , playerName)
    if playerName == "thisPlayer" then
        return game.thisPlayer
    elseif playerName == "rightPlayer" then
        return game.rightPlayer
    elseif playerName == "leftPlayer" then
        return game.leftPlayer
    end
end

---------------------
--  发放地主牌
function Game:dealLordCards()
    local player = self.lordPlayer
    player:addCards(self.lordCards)
end

--得到相对位置，返回数字，（0上家，1自己，2下家）
-- @param specifyPlayer 需要得到相对位置的玩家
-- @param currentPlayer 当前玩家
local function getRelativeIndex(specifyPlayer , currentPlayer)
    local player = currentPlayer
    local indexRelative = 1
    for index = 1 , 3 do
        if player == specifyPlayer then
            indexRelative = index
            break
        end
        player = player.nextPlayer
    end
    if indexRelative == 3 then
        indexRelative = 0
    end
    return indexRelative
end

--------------------------------
--  出牌
-- @param cardIDs 所出牌的table
-- @param cardType 所出牌的牌型
-- @param cardValue 所出牌的牌值
function Game:play(cardIDs , cardType , cardValue)
    table.removeMultiple(self.currentPlayer.cards , cardIDs)

    --设置当前压牌人，压牌牌型及牌值
    self.hold.cards = cardIDs
    self.hold.player = self.currentPlayer
    self.hold.cardType = cardType
    self.hold.cardValue = cardValue

    --分数统计相关
    if cardType == CARDSTYPE.BOMB_TYPE then
        self.score:bomb(self.currentPlayer.name)
    elseif cardType == CARDSTYPE.NUKE_TYPE then
        self.score:nuke(self.currentPlayer.name)
    end
    --记录地主反春牌数
    if self.lordPlayer == self.currentPlayer and self.revSpringNum == nil then
        self.revSpringNum = #self.lordPlayer.cards
    end

    self.currentPlayer = self.currentPlayer.nextPlayer
end


--获取是有要压的牌
function Game:getPressCards()
    if self.hold.player ~= self.currentPlayer and self.hold.cards ~= nil then
        return self.hold.cards , self.hold.cardType
    else
        return {}
    end
end

------------------------
--获取待出牌的牌型牌值等信息 返回值为列表，表中（1 牌类型，2牌值，3癞子的替换表）
-- @param cardIDs 牌的列表
function Game:getPlayCardType(cardIDs)
    local cardTypeSet = GameAI.GetCardType(cardIDs)
    local pressCards , pressType = self:getPressCards()
    if table.isEmptyOrNil(pressCards) then
        return cardTypeSet
    else
        local outputTypeSet = {}
        for i in pairs(cardTypeSet) do
            if pressType == cardTypeSet[i][1] or isBomb(cardTypeSet[i][1]) then
                cardTypeSet[i][3] = {}
                table.insert(outputTypeSet , cardTypeSet[i])
            end
        end
        return outputTypeSet
    end
end

function Game:getAIPlayCards()
    local player = self.currentPlayer
    if player.isAI == true then
        local myCards = player.cards
        local downCards = player.nextPlayer.cards
        local upCards = player.nextPlayer.nextPlayer.cards
        local lordIndex = getRelativeIndex(self.lordPlayer , player)
        local pressIndex = 1
        if self.hold.player ~= player and self.hold.cards ~= nil then
            pressIndex = getRelativeIndex(self.hold.player , player)
        end
        local pressCards = self:getPressCards()
        pressCards = pressCards or {}

        local num1 = #self.thisPlayer.cards
        local num2 = #self.rightPlayer.cards
        local num3 = #self.leftPlayer.cards
        local num_average = math.floor((num1 + num2 + num3) / 3)

        local think_time = 1000

        local cards = nil
        local cardType = nil
        local cardValue = nil
        local favusIndexTable = {}

        local pressLength = 0
        local pressType = 0
        local pressValue = 0
        if not table.isEmptyOrNil(pressCards) then
            pressType = self.hold.cardType
            pressLength = #self.hold.cards
            pressValue = self.hold.cardValue
        end

            --[[GameAI. GetAIPutWays获取AI的一次出牌
            GameAI. GetAIPutWays : 返回类型  [table – AI出牌数组 , int 牌类型 , int 牌值]
            参数（
            table upcards //上家牌，
            table mycards //自己牌，
            table downcards //下家牌，
            int land_index //地主位置（0上家，1自己，2下家）
            int presstype //压牌类型，
            int pressval //压牌牌值，
            int presslen //压牌的牌长度，
            int pressindex //压牌的位置（0上家，1没压牌自己先出（此时压牌为空），2下家），
            int thinktime //搜索时间（单位毫秒）
            ）--]]
            local msgTable = GameAI.GetAIPutWays(upCards , myCards , downCards , lordIndex , pressType , pressValue , pressLength , pressIndex , think_time)
            cards = msgTable[1]
            cardType = msgTable[2]
            cardValue = msgTable[3]
        end

        if table.isEmptyOrNil(cards) then
            return false
        else
            return true , cards , cardType , cardValue , favusIndexTable
        end
end