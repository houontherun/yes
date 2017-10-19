---
--- Created by hou.
--- DateTime: 2017/10/13 9:41
---

local skynet = require "skynet"
local Avatar = require "avatar"
require "bjx_table"

local players = {}
local room_id
local game

local CMD = {}

local function get_player(uid)
    for p in players do
        if p.uid == uid then
            return p
        end
    end
end

local function del_player(uid)
    local p = get_player(uid)
    if p then
        table.remove(players, p.pos)
    end
end

function CMD:enter_room(uid, msg)
    local pos = 0
    for i = 1,game.maxplayer do
        if not players[i] then
            pos = i
            break
        end
    end
    if not pos then
        return {c="sc_enter_room_failed", reason="room is full"}
    end
    local player = Avatar.ctor(uid, msg.agent)
    for p in players do
        p.on_other_enter({pos=pos, info=msg})
    end
    players[pos] = player
end

local function destory()
    skynet.exit()
end

function CMD:exit_room(uid, msg)

    for p in players do
        if p.uid ~= uid then
            p.on_other_leave(uid)
        end
    end

    if table.is_empty_or_nil(players) then
        print("all player leave the room will destory")
        destory()
    end
end

function CMD:prepare(uid, msg)

end

local function create_game(type)

end

function CMD:open(id, msg)
    room_id = id
    game = gameset[msg.gametype]
    if not game then
        return false
    end
    return true
end



skynet.start(function ()
    skynet.dispatch("lua", function (_, _, cmd, ...)
        local f = assert(CMD[cmd])
        skynet.ret(skynet.pack(f(...)))
    end )
end)