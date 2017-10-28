local skynet = require "skynet"
--local netpack = require "skynet.netpack"
local netpack = require "websocketnetpack"
local socket = require "skynet.socket"
local json = require "json"
require "bjx_table"

local CMD = {}
local CLIENT = {}

local WatchDog
local ClientFD
local ClientIP
local Gate

local Room  -- 玩家玩游戏时所进入的房间
-- {userid = userid, entityid=userid, name=("random"..sdkid), gold = 10000, diamond = 100, card = 10}
local UserInfo = {userid=1, entityid=1, name=1, gold=1, diamond=1, card=1} -- 定义所需要的数据
local UserID
local UserData = {}

local IsOnline = true

local function get_userdata()
	return UserData
end

local function set_userdata(data)
	for index, value in pairs(data) do
		if UserInfo[index] then
			UserData[index] = value
		end
	end
end


local function send_message(msg)
	local data = json.encode(msg)
	print("len data is " .. string.len(data))
	local package, sz = netpack.pack(data)
	-- socket.write(client_fd, package)
	print("clientfd1111111 " .. sz)
	socket.write(ClientFD, package, sz)
end

local function login()
	local userdata = get_userdata()
	local login_message = {c="sc_login_succ", userid = UserID,
		entityid=userdata.entityid, gold=userdata.gold,diamond=userdata.diamond, card=userdata.card}
	send_message(login_message)
	if Room then
		-- 恢复游戏情况
		local roominfo_message = skynet.call(Room, "lua", "get_now_info", UserID)
		roominfo_message.c = "sc_room_info_recover"
		send_message(roominfo_message)
	end
end

function CLIENT.cs_create_room(msg)
	print("create_room " .. msg.c)
	local gametype = assert(msg.gametype)
	print("gametype " .. gametype)
	local roommanager = skynet.uniqueservice("roommanager")
	print("roommanager " .. roommanager)
	local ret = skynet.call(roommanager, "lua", "create_room", msg)
	print("ret " .. ret.c)
	if ret then
		if ret.room then
			Room = ret.room
			ret.room = nil
		end
		send_message(ret)
	end
	if Room then
		local roominfo = skynet.call(Room, "lua", "enter_room", UserID, skynet.self(), ClientIP, UserData)
	end
end

function CLIENT:cs_exit_room(msg)
	if not Room then
		local ret = {c = "sc_leave_room_ret"}
		send_message(ret)
	end
	skynet.call(Room, "lua", "exit_room", UserID)
	local ret = {c = "sc_leave_room_ret"}
	send_message(ret)
	Room = nil
end

function CLIENT.cs_enter_room(msg)
	local roomid = assert(msg.roomid)
	local roommanager = skynet.uniqueservice("roommanager")
	local room = skynet.call(roommanager, "lua", "get_room", roomid)
	if not room then
		local enter_message = {c = "enter_room_failed", reason = "unknown roomid"}
		send_message(enter_message)
		return
	end

	local ret = skynet.call(room, "lua", "enter_room", UserID, skynet.self(), ClientIP, UserData)
	print("cs_enter_room " .. table.serialize(ret))
	if ret then
		if ret.room then
			Room = ret.room
			ret.room = nil
		end
		send_message(ret)
	end
end

function CLIENT.cs_prepare(msg)
	assert(Room)
	print("prepare-------------------")
	local ret = skynet.call(Room, "lua", "prepare", UserID)
	if ret then
		send_message(ret)
	end
end

function CLIENT.cs_aution(msg)  -- 抢地主
	assert(Room)
	local score = assert(msg.score)
	local ret = skynet.call(Room, "lua", "auction", UserID, score)
end

function CLIENT.cs_double(msg)  -- 加倍
	assert(Room)
	local double = assert(msg.double)
	skynet.call(Room, "lua", "double", UserID, double)
end

function CLIENT.cs_play(msg)
	assert(Room)
	local cards = assert(msg.cards)
	local ret = skynet.call(Room, "lua", "play", UserID, cards)
	if ret then
		send_message(ret)
	end
end

function CLIENT.cs_trusteeship(msg)
	assert(Room)
	local is_trusteeship = assert(msg.is_trusteeship)
	local ret = skynet.call(Room, "lua", "trusteeship", UserID, is_trusteeship)
end

function CLIENT:save_money(msg)
end

skynet.register_protocol {
	name = "client",
	id = skynet.PTYPE_CLIENT,
	unpack = netpack.tostring,
	dispatch = function(_, _, data)
		print("client ~~~~~~~~~~~~~~~~~  :" .. data)
		local ok, msg = pcall(json.decode, data)
		if ok then
			if msg.c then
				local f = assert(CLIENT[msg.c])
				f(msg)
			end
		else
			print ("Failed decode msg "..data)
		end
	end
}

-- { gate = gate, client = fd, ip = addr, watchdog = skynet.self(), userdata = userdata}
function CMD.start(conf)
	WatchDog = conf.watchdog
	ClientFD = conf.client
	ClientIP = conf.ip
	Gate = conf.gate

	local userdata = conf.userdata
	UserID = userdata.userid
	set_userdata(userdata)
	print("ClientFD is ".. ClientFD)
	skynet.call(Gate, "lua", "forward", ClientFD) -- bind avatar to gate
	login()
end

function CMD.leave_room()
	-- 通知离开房间
	Room = nil
end

function CMD.notify_client(msg)
	print("notify_client"..table.serialize(msg))
	send_message(msg)
end

function CMD.on_other_login(fd, addr)
	-- 踢掉当前在线玩家，由新玩家接管游戏情况
	local kick_message = {c="sc_kick", reason="other login"}
	send_message(kick_message)
	skynet.call(Gate, "lua", "kick", ClientFD)
	ClientFD = fd
	ClientIP = addr
	skynet.call(Gate, "lua", "forward", ClientFD)
	login()
end

function CMD.on_reconnection(fd, addr)
	ClientFD = fd
	ClientIP = addr
	skynet.call(Gate, "lua", "forward", ClientFD)
	login()
end




local function close()
	if IsOnline then
		return
	end
	if Room then
		-- 需要等到结束结算之后才能清楚,5分钟后查看
		skynet.timeout(30000, close)
	end
	print("agent will close")
	local savedata = get_userdata()
	skynet.call("DBProxy", "lua", "set", UserID, savedata)
	skynet.exit()
end

function CMD.disconnect()
	-- TODO: 进入离线模式，等待重连
	IsOnline = false
	ClientIP = nil
	ClientFD = nil
	close()
	skynet.exit()
end


skynet.start(function()
	skynet.dispatch("lua", function(_,_, command, ...)
		print("agent command " .. command)
		local f = CMD[command]
		skynet.ret(skynet.pack(f(...)))
	end)
end)
