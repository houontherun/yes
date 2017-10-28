---
--- Created by hou.
--- DateTime: 2017/10/13 9:30
---

local skynet = require "skynet"
local const = require "const"
local math = require "math"
local os = require "os"
require "bjx_table"

local RoomManager = {}
local CMD = {}

local IDPoll = {}
local NextRoomID = 0

local function shuffle()
	math.randomseed(os.time())
    math.random(1,10000) -- 防止后面随机的数都一样
	local index = 1
	for v = 1111, 9999 do
		IDPoll[index] = v
		index = index + 1
	end
    local cnt = #IDPoll
	print ("cnt is " .. cnt)

    for i=1,cnt do
        local j = math.random(i,cnt)
        IDPoll[i],IDPoll[j] = IDPoll[j],IDPoll[i]
    end
	print("hahaha " .. IDPoll[894])
	print("haha--------------------- " .. IDPoll[7894])
	print("shuffle" .. table.serialize(IDPoll))
end

local function generate_room_id()
	local count = 1
	local length = #IDPoll
	while count < length do  -- 最多循环一遍
		local roomid = (NextRoomID + count) % length
		if not RoomManager[roomid] then
			NextRoomID = roomid
			return NextRoomID
		end
	end
end

function CMD.create_room(msg)
	local gametype = assert(msg.gametype)
	print("gametype" .. gametype)
	if not const.game_type[gametype] then
		local back = {}
		back.c = "sc_create_room_failed"
		back.reason = "unknown game type"
		return back
	end
	local roomid = generate_room_id()
	print("roomid" .. roomid)
	if roomid then
		local room = skynet.newservice("room")
		local ret = skynet.call(room, "lua", "open", roomid, gametype)
		RoomManager[roomid] = room
		msg.c = "sc_create_room_succ"
		msg.roomid = roomid
		msg.room = room
		return msg
	end
	msg.c = "sc_create_room_failed"
	msg.reason = "room is full"
	return msg
end

function CMD.on_destory_room(roomid)
	RoomManager[roomid] = nil
end

function CMD.get_room(roomid)
	return RoomManager[roomid]
end

function CMD.enter_room(msg)
	local roomid = msg.roomid
	local room = RoomManager[roomid]
	if not room then
		msg.c = "sc_enter_room_failed"
		return msg
	end
	msg.room = room
	local ret = skynet.call(room, "lua", "enter_room", msg)
	return ret
end

shuffle()

skynet.start(function()
	skynet.dispatch("lua", function(_,_, command, ...)
		local f = CMD[command]
		skynet.ret(skynet.pack(f(...)))
	end)
end)