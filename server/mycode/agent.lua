local skynet = require "skynet"
--local netpack = require "skynet.netpack"
local netpack = require "websocketnetpack"
local socket = require "skynet.socket"
local json = require "json"

local WATCHDOG

local CMD = {}
local client_fd
local client_ip
local room  -- 玩家玩游戏时所进入的房间
local uid
local gold = 0
local diamond = 0

local entity = {}

--local function send_package(pack)
--	local package = string.pack(">s2", pack)
--	socket.write(client_fd, package)
--end

local function send_message(msg)
	local data = json.encode(msg)
	local package = netpack.pack(data)
	socket.write(client_fd, package)
end

function entity.create_room(msg)
	local roommanager = skynet.uniqueservice("roommanager")
	local ret = skynet.call(roommanager, "lua", "create_room", msg)
	if ret then
		if ret.room then
			room = ret.room
			ret.room = nil
		end
		send_message(ret)
	end
end

function entity.exit_room(msg)
	local roommanager = skynet.uniqueservice("roommanager")
	local ret = skynet.call(roommanager, "lua", "exit_room", msg)
	if ret then
		send_message(ret)
	end
	room = nil
end

function entity:enter_room(msg)
	local roommanager = skynet.uniqueservice("roommanager")
	local ret = skynet.call(roommanager, "lua", "enter_room", msg)
	if ret then
		if ret.room then
			room = ret.room
			ret.room = nil
		end
		send_message(ret)
	end
end

function entity:prepare(msg)
	local ret = skynet.call(room, "lua", "prepare", uid)
	if ret then
		send_message(ret)
	end
end

function entity:play(msg)
	local ret = skynet.call(room, "lua", "play", uid, msg)
	if ret then
		send_message(ret)
	end
end

function entity:save_money(msg)
	local money = msg.money
	if money > self.money then
		send_package({"ret":"fuck u liar"})
	end
end

skynet.register_protocol {
	name = "client",
	id = skynet.PTYPE_CLIENT,
	unpack = netpack.tostring,
	dispatch = function(_, _, data)
		local ok, msg = pcall(json.decode, data)
		if ok then
			if msg.c then
				local f = assert(entity[msg.c])
				f(msg)
			end
		else
			print ("Failed decode msg "..data)
		end
	end
}

function CMD.start(conf)
	local fd = conf.client
	local gate = conf.gate
	WATCHDOG = conf.watchdog
	uid = conf.uid
	client_fd = fd
	client_ip = conf.ip
	skynet.call(gate, "lua", "forward", fd) -- bind avatar to gate
	send_package("login success")
end

function CMD.disconnect()
	-- todo: do something before exit
	skynet.exit()
end

skynet.start(function()
	skynet.dispatch("lua", function(_,_, command, ...)
		local f = CMD[command]
		skynet.ret(skynet.pack(f(...)))
	end)
end)
