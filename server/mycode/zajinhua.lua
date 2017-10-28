
local skynet = require "skynet"
local class = require "lua_object".class
local poker = require "poke_util"

local ZJH = class()

function ZJH:ctor()

end

function ZJH:init()

end

function ZJH:shuffle()
    local allCards = {}
    for i = 1, 52 do
        table.insert(allCards, i)
    end

    self.players[1].cards = {}
    self.players[2].cards = {}
    self.players[3].cards = {}

    for i = 1, 51 do
        local n = math.random(54 - i)
        local tmp = allCards[n]
        allCards[n] = allCards[55 - i]
        allCards[55 - i] = tmp
    end
    --
    --for i, player in ipairs({self.players[1], self.players[2], self.players[3]}) do
    --    local playerCards = {}
    --    local index = (i - 1) * 17
    --    for x = index + 1, index + 17 do
    --        table.insert(playerCards, allCards[x])
    --    end
    --    player:add_cards(playerCards)
    --end
    --
    --for i = 52, 54 do
    --    table.insert(self._lordCards, allCards[i])
    --end
end


--1	豹子	不同	相同3张	单张的大小
--2	顺金	相同	连续3张	单张的大小
--3	金华	相同	非连续	单张的大小
--4	顺子	不同	连续3张	单张的大小
--5	对子	不同	相同2张，1张不同	对子大小，然后单张
--6	单牌	不同	不同且不连续	单张大小

-- 按照数值从大到小排序
local function sort_card(cards)

end

local function get_card_type(cards)
    local value_count = {}
    local color_count = {}
    local value = {}
    for _, card in pairs(cards) do
        local v = poker.get_card_value(card)
        table.insert(value, v)
        if value_count[v] then
            value_count[v] = value_count[v] + 1
        else
            value_count[v] = 1
        end
        local c = poker.get_card_color(card)
        if color_count[c] then
            color_count[c] = color_count[c] + 1
        else
            color_count[c] = 1
        end
    end

    local type, min, max
    if table.getnum(value_count) == 1 then
        -- 1	豹子	不同	相同3张
        type = 1
        min = value[1]
    elseif table.getnum(color_count) == 1 then
        if ((value[1] - 1) == value[2]) and ((value[2] - 1) == value[3]) then
            --2	顺金	相同	连续3张	单张的大小
            type = 2
            min = value[3]
            max = value[1]
        else
            --3	金华	相同	非连续	单张的大小
            type = 3
            min = value[3]
            max = value[1]
        end
    elseif table.getnum(value_count) == 3 and ((value[1] - 1) == value[2]) and ((value[2] - 1) == value[3]) then
        --4	顺子	不同	连续3张	单张的大小
        type = 4
        min = value[3]
        max = value[1]
    elseif table.getnum(value_count) == 2 then
        --5	对子	不同	相同2张，1张不同	对子大小，然后单张
        type = 5
    else
        --6	单牌	不同	不同且不连续	单张大小
        type = 6
    end

    return type, value
end

-- 1 第一副牌大  2 第二副牌大  0 一样
local function compare_cards(card1, card2)
    local type1, value1 = get_card_type(card1)
    local type2, value2 = get_card_type(card2)
    print("type1 , value1", type1, table.serialize(value1))
    print("type2 , value2", type2, table.serialize(value2))

    if type1 < type2 then
        return 1
    end
    if type1 > type2 then
        return 2
    end

    if type1 == 5 then
        -- 对子的情况需要特殊处理
        local double1 = value1[2]
        local single1 = value1[1]
        if value1[1] == value1[2] then
            single1 = value1[3]
        end
        local double2 = value2[2]
        local single2 = value2[1]
        if value2[1] == value2[2] then
            single2 = value2[3]
        end
        if double1 > double2 then
            return 1
        elseif double1 < double2 then
            return 2
        end
        if single1 > single2 then
            return 1
        elseif single1 < single2 then
            return 2
        end
        return 0
    end

    for i = 1, 3 do
        if value1[i] > value1[2] then
            return 1
        elseif value1[i] < value1[2] then
            return 2
        end
    end

    -- 说明完全一样
    return 0
end


function ZJH:start(players)
    self.players = players
    self.shuffle()
    self.banker = pos
    self.turn = self.banker
    self:send_to_start()
end

function ZJH:send_to_play()
    local info = {c = "sc_zjh_start", pos = self.turn}
    self:send_all(info)
    self.cancel = cancel_able_timeout(2000, function () self:on_user_timeout() end )
end

function ZJH:on_user_timeout()
    local info = {c = "sc_zjh_discard", pos = self.turn}
    self:send_all(info)
    self.turn = self.turn + 1
    self:send_to_play()
end

function ZJH:on_user_play(uid, play)
    -- TODO 具体玩法
    self.turn = self.turn + 1
    self:send_to_play()
end