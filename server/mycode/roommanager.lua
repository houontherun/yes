---
--- Created by hou.
--- DateTime: 2017/10/13 9:30
---

local skynet = require "skynet"
local const = require "const"

local rooms = {}
local max_room_count = 9999
local CMD = {}

local idpoll = {}
local nextroomid = 0

local function generate_room_id()
	local count;
	while count < max_room_count do
		if not rooms[(nextroomid + count) % 10000] then
			nextroomid = (nextroomid + count)%10000
			return nextroomid;
		end
	end
end

function CMD:create_room(msg)
	if not const.game_type[msg.gametype] then
		msg.c = "sc_create_room_failed"
		msg.reason = "unknown game type"
		return msg
	end
	local roomid = generate_room_id()
	if roomid then
		local room = skynet.newservice("room")
		skynet.call(room, "lua", "open", roomid, msg)
		rooms[roomid] = room
		msg.c = "sc_create_room_succ"
		msg.roomid = roomid
		msg.room = room
		return msg
	end
	msg.c = "sc_create_room_failed"
	msg.reason = "room is full"
	return msg
end

local function _destory_room(id)
	local r = rooms[id]
	if r then
		skynet.send(r, "lua", "destory", id)
		rooms[r] = nil
	end
end

function CMD:destory_room(msg)
	_destory_room(msg.roomid)
	return {c = "sc_leave_room_ret "}
end

function CMD:enter_room(msg)
	local roomid = msg.roomid
	local room = rooms[roomid]
	if not room then
		msg.c = "sc_enter_room_failed"
		return msg
	end
	msg.room = room
	local ret = skynet.call(room, "lua", "enter_room", msg)
	return ret
end

function CMD:exit_room(msg)
	local roomid = msg.roomid
	local room = rooms[roomid]
	if room then
		local ret = skynet.call(room, "lua", "exit_room", msg)
	end
	return {c="sc_leave_room_ret"}
end

skynet.start(function()
	skynet.dispatch("lua", function(_,_, command, ...)
		local f = CMD[command]
		skynet.ret(skynet.pack(f(...)))
	end)
end)