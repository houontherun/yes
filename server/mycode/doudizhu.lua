---
--- Created by hou.
--- DateTime: 2017/10/13 15:48
---

local skynet = require "skynet"
local math = require "math"
local class = require "lua_object".class
local ai = require "ddzAI"

-- 出牌类型
ERROR_TYPE = 0
SINGLE_TYPE = 1  -- 单牌
PAIR_TYPE = 2   -- 对子
TRIO_TYPE = 3   -- 三张
TRIOSINGLE_TYPE = 4  -- 三带一
TRIODOUBLE_TYPE = 5 -- 三带二
STRAIGHT_TYPE = 6  -- 顺子
CONPAIR_TYPE = 7  -- 连对
AEROPLANE_TYPE = 8  -- 飞机
AEROPLANES_TYPE = 9 -- 飞机带单牌
AEROPLANEL_TYPE = 10 -- 飞机带对子
FOURSINGLE_TYPE = 11  -- 四带一
FOURDOUBLE_TYPE = 12 -- 四带二
FAVUS_BOMB_TYPE = 13 -- 癞子炸弹
BOMB_TYPE = 14  -- 炸弹
ALLFAVUS_BOMB_TYPE = 15 -- 全癞子炸弹
NUKE_TYPE = 16 -- 王炸


-- 根据C++代码，
-- 1~13表示黑桃3, 4, 5, ..., 10, J, Q, K, A, 2,
-- 14~26表示红桃3, 4, 5, ..., 10, J, Q, K, A, 2,
-- 27~39表示梅花3, 4, 5, ..., 10, J, Q, K, A, 2,
-- 40~52表示方块3, 4, 5, ..., 10, J, Q, K, A, 2,
-- 53, 54表示小王、大王

local function get_card_value(e)
    -- 根据牌的大小，返回[1, 15]
    if e < 53 then
        return (e -1) % 13 + 1
    else
        return e - (53 - 14)
    end
end

local function get_card_color(e)
    if e < 53 then
        return (e-1)/13 + 1
    else
        return e - (53 - 5)
    end
end

-- 可以取消的定时器，skynet并没有提供移除定时器的接口，因此通过改变回调实现
local function cancelable_timer( ti,func)
	local function cb( )
		if func then
			func()
		end
	end
	local function cancel( )
		func = nil
	end
	skynet.timeout(ti,cb)
	return cancel
end

local function card_cmp(e1, e2)
    if e1 < 53 then
        a = (e1 - 1) / 13
        b = (e1 - 1) % 13
        e1 = b * 4 + a + 1
    end

    if e2 < 53 then
        a = (e2 - 1) / 13
        b = (e2 - 1) % 13
        e2 = b * 4 + a + 1
    end

    if e1 < e2 then
        return false
    else
        return true
    end
end

--[[
分成三个阶段
1 发牌
2 叫地主
3 加倍
4 打牌
5 结算
--]]

local Score = class()
function Score:ctor()
    self.bomb = 0
    self.spring = false
end



local DDZ = class()

function DDZ:ctor()
end

function DDZ:init()
	self._game_status = 1		--游戏进度
	self._lordCards = {}		--地主牌
	self._current_idx = 1		--当前玩家
	self._landlord_idx = nil	--地主id
	self._ask_times = 0			--叫地主次数
    self._tick_timer = nil
    self.turn = 0 --当前出牌次序
    self.last_post = 0 --上一位出牌的(而不是要不起的)
    self.last_cards = nil
    self.next = {}
    self.next[1] = 2
    self.next[2] = 3
    self.next[3] = 1
end

function DDZ:shuffle()
    local allCards = {}
    for i = 1, 54 do
        table.insert(allCards, i)
    end

    self.players[1].cards = {}
    self.players[2].cards = {}
    self.players[3].cards = {}

    for i = 1, 53 do
        local n = math.random(54 - i)
        local tmp = allCards[n]
        allCards[n] = allCards[55 - i]
        allCards[55 - i] = tmp
    end

    for i, player in ipairs({self.players[1], self.players[2], self.players[3]}) do
        local playerCards = {}
        local index = (i - 1) * 17
        for x = index + 1, index + 17 do
            table.insert(playerCards, allCards[x])
        end
        player:add_cards(playerCards)
    end

    for i = 52, 54 do
        table.insert(self._lordCards, allCards[i])
    end

    print("player1 card ", table.serialize(self.players[1].cards))
    print("player2 card ", table.serialize(self.players[2].cards))
    print("player3 card ", table.serialize(self.players[3].cards))
    print("lord card ", table.serialize(self._lordCards))

    --self.turn = math.random(1,3)
    --TODO 真正的玩家的是地主，为了测试
    self.turn = 3
end

function DDZ:_can_play_card()

end


function DDZ:start(p1, p2, p3)
    self.players = {}
    self.players[1] = p1
    p1:set_game(self)
    self.players[2] = p2
    p2:set_game(self)
    self.players[3] = p3
    p3:set_game(self)
    self.auction_score = 0
    self.auction_pos = 0
    self.auction_count = 0
    self.double_count = 0

    self:init()

    self:shuffle() -- 洗牌发牌
    self:send_turn_to_auction()
end

function DDZ:get_player_by_uid(uid)
    for _, v in pairs(self.players) do
        if v.uid == uid then
            return v
        end
    end
    assert(false)
end

function DDZ:send_all_player(msg)
    for _, player in pairs(self.players) do
        player:call_client_method(msg)
    end
end

function DDZ:on_user_auction_timeout(pos)
    -- 超时就是不叫地主
    self:process_auction_action(pos, 0)
end

function DDZ:send_turn_to_auction()
    assert(self.auction_count < 3)
    -- 轮流叫地主 1,2,3分，不叫
    local pos = self:get_active_pos(self.turn)
    for _, p in self.players do
        p:on_wait_auction(pos)
    end

    self._tick_timer = cancelable_timer(500, function()  self:on_user_auction_timeout(pos) end )  -- 5s之后
end


function DDZ:user_become_lord(pos)
    self.lordpos = pos
    --local player = self.players[pos]
    local auction_msg = {c = "sc_auction_result", pos = pos}
    self:send_all_player(auction_msg)
    local auction_card = {c = "sc_auction_cards", cards = self._lordCards }
    local player = self.players[pos]
    player:call_client_method(auction_card)
    self.last_post = pos
end

function DDZ:get_active_pos()
    local pos = self.turn % 3
    if pos == 0 then
        pos = 3
    end
    return pos
end

function DDZ:process_auction_action(pos, score)
    -- 处理抢地主
    self.auction_count = self.auction_count + 1

    if score > self.auction_score then
        self.auction_score = score
        self.auction_pos = pos
    end

    if score >= 3 or self.auction_count >= 3 then
        -- 3分直接成为地主 或者 三人叫过之后最高的那个
        self:user_become_lord(self.auction_pos)
        self:send_turn_to_double() -- 开始下一步
        return
    end

    local game_info = {c = "sc_ddz_aution_score", pos = pos, score = score}
    self.send_all_player(game_info)
    self.turn = self.turn + 1 -- 轮到下一个人了
    self.send_turn_to_auction()
end

function DDZ:on_user_auction(uid, score)
    local pos = self:get_active_pos()

    local player = self.players[pos]
    if player.uid ~= uid then
        -- 有人作弊
        print("fuck liar")
        return
    end
    self._tick_timer()
    self:process_auction_action(pos, score)
end

function DDZ:send_turn_to_double()
    self._game_status = 3 --加倍
    local game_info = {c = "sc_ddz_double" }
    for _, p in self.players do
        p:on_wait_double()
    end
    self:send_all_player(game_info)
    self._tick_timer = cancelable_timer(500, function()  self:start_play() end)
end


function DDZ:on_user_double(uid, double)
    self.double_count = self.double_count + 1
    if double then
        local player = self:get_player_by_uid(uid)
        player:double(true)
        local double_message = {"sc_double", pos = player.pos}
        self:send_all_player(double_message)
    end
    if double_count >= 3 then
        self._tick_timer()
        self:start_play()
    end
end

function DDZ:start_play()
    print("start_play---------------------")
    self._game_status = 4 -- 打牌
    self.turn = self.lordpos -- 地主开始出牌
    self:send_turn_to_play()
end

function DDZ:check_user_cards_exist(player, cards)

end


function DDZ:process_play_cards(pos, cards, card_type, card_value)
    local player = self.players[pos]

    -- TODO 需要记录炸弹和春天的情况
    local info = {c = "sc_play", pos = pos, cards = cards}
    self:send_all_player(info)

    player:remove_cards(cards)

    if table.is_empty_or_nil(player.cards) then
        self:on_user_win(pos)
    else
        self.turn = self.turn + 1
        self:send_turn_to_play()
    end
end

function DDZ:on_user_play(uid, cards)
    assert(self._game_status == 4)
    local pos = self:get_active_pos()
    local player = self.players[pos]
    if player.uid ~= uid then
        -- 有人作弊
        return {c = "sc_play_failed", reason = "not this uid"}
    end

    if table.getnum(cards) == 0 then
        return {c = "sc_play_failed", reason = "cards length 0"}
    end

    -- 出牌的合法性
    local gotType, gotValue = GameAI.GetCardType(cards)
    if gotType == ERROR_TYPE then
        return {c = "sc_play_failed", reason = "wrong card"}
    end
    -- 是否能压过上家的牌
    if self.last_cards then
        if not GameAI.CanPress(cards, self.last_cards) then
            return {c = "sc_play_failed", reason = "cant press"}
        end
    end

    for _, v in cards do
        --TODO 检查牌是否是玩家所有
    end
    self:_tick_timer()
    self:process_play_cards(pos, cards, gotType, gotValue)
end

function DDZ:on_user_pass(uid)

end

function DDZ:on_user_play_timeout(pos)
    assert(pos == self:get_active_pos())
    --local player = self.players[pos]
    if pos == self.last_post then
        -- TODO 必须出牌进入托管状态
        local player = self.players[pos]
        player:set_managed(true)
        player:on_wait_play_card(pos)
        return
    end

    local msg = { c = "sc_play_pass", pos = pos}
    self:send_all_player(msg)
    self.turn = self.turn + 1
    self:send_turn_to_play()
end

function DDZ:send_turn_to_play()
    local pos = self:get_active_pos()
    for _, p in pairs(self.players) do
        p:on_wait_play_card(pos)
    end
    self._tick_timer = cancelable_timer(3000, function () self:on_user_play_timeout(pos) end)
end

function DDZ:on_user_win(pos)
    assert(pos == self:get_active_pos())
    local winner = self.players[pos]
    if self.lordpos == pos then
        -- 地主胜利
        local info = {"sc_ddz_lord_win"}
    else
        -- 农民胜利
    end

    self.send_all_player(info)

end

function DDZ:ai_play(pos)
    -- 机器人代打
    local p1 = self.players[pos]
    local p2 = self.players[self.next[pos]]
    local p3 = self.players[self.next[self.next[pos]]]

end

function DDZ:managed_play(pos)
    -- 托管
end

function DDZ:tick()
    -- 主要进行超时的处理

end

function DDZ:timeout_process()
    -- 超时处理
end

function DDZ:notify_ask_land_lord()
    -- 通知玩家叫地主
    local p = self.player[self._current_idx]
    p.notify_ask_land_lord()
end

return DDZ