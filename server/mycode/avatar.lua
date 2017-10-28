---
--- Created by hou.
--- DateTime: 2017/10/17 14:57
---

local skynet = require "skynet"
local class =  require "lua_object".class

local Avatar = class()

-- uid, agent, client_ip, userdata
function Avatar:ctor(uid, agent, ip, pos, conf)
    self.uid = uid
    self.agent = agent
    self.ip = ip
    self.pos = pos
    self.gameinfo = conf
    self.cards = {}
    self.is_double = false
    self.is_prepare = false
    self.is_managed = false
    self.game = nil
    if agent then
        self.is_robot = false
    else
        self.is_robot = true
    end
end

function Avatar:prepare()
    self.is_prepare = true
end

function Avatar:set_game(game)
    self.game = game
end

function Avatar:set_managed(m)
    self.is_managed = m
end

function Avatar:add_cards(_cards)
    for _, v in pairs(_cards) do
        table.insert(self.cards, v)
    end
    local msg = {c = "sc_add_cards", cards = self.cards}
    self:call_client_method(msg)
end

function Avatar:get_small_card()
    -- TODO 超时出一张最小的牌
    return 3
end

function Avatar:remove_cards(_cards)
    table.remove_multiple(self.cards, _cards)
    if table.is_empty_or_nil(self.cards) then
        -- 出完牌了，赢了
        self.game:on_user_win(self)
    end
end

function Avatar:double(d)
    self.is_double = d
end

function Avatar:call_client_method(args)
    if self.is_robot then
        return
    end
    assert(args)
    print("args is -----------------------------------------------" .. table.serialize(args))
    skynet.send(self.agent, "lua", "notify_client", args)
end

function Avatar:on_other_enter(info)
    print("on_other_enter")
    --local msg = "sc_create_player "
    --self:call_client_method(msg)
end

function Avatar:on_other_exit(uid)
    print("on_other_exit")
end

function Avatar:on_other_prepare(pos)
    local info = {c = "sc_ddz_prepare", pos = pos}
    self:call_client_method(info)
end

function Avatar:on_wait_auction(pos)
    if pos == self.pos and self.is_robot then
        -- TODO AI叫地主

    elseif pos == self.pos and self.is_managed then
        -- TODO 托管叫地主
    else
        -- 通知玩家斗地主
        local info = {c = "sc_ddz_aution", pos = pos}
        self:call_client_method(info)
    end
end

function Avatar:on_wait_double()
    if self.is_robot then
        -- TODO AI加倍

    elseif self.is_managed then
        -- TODO 托管不加倍
    else
        -- 通知玩家出牌
        local info =  {c = "sc_ddz_double" }
        self:call_client_method(info)
    end
end

-- 等待玩家出牌
function Avatar:on_wait_play_card(pos)
    if pos == self.pos and self.is_robot then
        -- TODO AI出牌
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
        --local up_cards, down_cards = self.game.get_other_player_cards(pos)
        --landlord_index = 0 if p3 == self._lordPlayer else (1 if p1 == self._lordPlayer else 2)
        --press_cards = self._lastCards or []
        --press_index = 1 if not self._lastCards else (0 if p3 == self._lastCardsPlayer else (1 if p1 == self._lastCardsPlayer else 2))
        --think_time = 1000
    else
        -- 通知玩家出牌
        local info = {c = "sc_ddz_wait_play", pos = pos}
        self:call_client_method(info)
        return
    end

end

return Avatar