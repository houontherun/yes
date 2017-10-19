---
--- Created by hou.
--- DateTime: 2017/10/13 15:48
---

local skynet = require "skynet"
local math = require "math"

local DDZ = {}

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


function DDZ:ctor(players)
    self.player = players
end

--[[
分成三个阶段
1 发牌
2 叫地主
3 加倍
4 打牌
5 结算
--]]

function DDZ:init()
	self._game_status = 1		--游戏进度
	self._lordCards = {}		--地主牌
	self._current_idx = 1		--当前玩家
	self._landlord_idx = nil	--地主id
	self._ask_times = 0			--叫地主次数
    self._tick_timer = nil
end

function DDZ:shuffle()
    local allCards = {}
    for i = 1, 54 do
        table.insert(allCards, i)
    end

    self.player[1].cards = {}
    self.player[2].cards = {}
    self.player[3].cards = {}

    for i = 1, 53 do
        local n = math.random(54 - i)
        local tmp = allCards[n]
        allCards[n] = allCards[55 - i]
        allCards[55 - i] = tmp
    end

    for i, player in ipairs({self.player[1], self.player[2], self.player[3]}) do
        local playerCards = {}
        local index = (i - 1) * 17
        for x = index + 1, index + 17 do
            table.insert(playerCards, allCards[x])
        end
        player:addCards(playerCards)
    end

    for i = 52, 54 do
        table.insert(self._lordCards, allCards[i])
    end
end

function DDZ:start()
    self.init()
    self.next_player_table = {}
    self.next_player_table[1] = 2
    self.next_player_table[2] = 3
    self.next_player_table[3] = 1

    self.shuffle()
    --self.sort() -- 给牌排序
    for p in self.player do
        p.send()
    end
    self._tick_timer = cancelable_timer(1000, )
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

