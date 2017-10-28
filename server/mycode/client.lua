---
--- Created by hou.
--- DateTime: 2017/10/11 17:46
---
--package.cpath = '/home/hou/git/yes/server/luaclib/?.so;'
--package.path = '/home/hou/git/yes/server/lualib/?.lua;'
package.path = '../lualib/?.lua;'
package.cpath = '../luaclib/?.so;'
if _VERSION ~= "Lua 5.3" then
	error "Use lua 5.3"
end

--local socket = require "client.socket"
local socket = require "clientwebsocket"
local json = require "json"

local fd = assert(socket.connect("127.0.0.1", 8888))

local function send_package(fd, pack)
    --print(pack)
	--local package = string.pack(">s2", pack)
    --print(package)
	socket.send(fd, pack)
end

local function unpack_package(text)
	local size = #text
	if size < 2 then
		return nil, text
	end
	local s = text:byte(1) * 256 + text:byte(2)
	if size < s+2 then
		return nil, text
	end

	return text:sub(3,2+s), text:sub(3+s)
end

local function recv_package()
	local r , istimeout= socket.recv(fd, 100)
	if not r then
		return nil
	end
	if r == ""  and istimeout == 0 then
		error "Server closed"
	end
	return r
end

local session = 0

local function send_json(args)
    local data = json.encode(args)
    send_package(fd, data)
end

local last = ""

local CMD = {}

function CMD.sc_login_succ(msg)
	-- 登录成功之后创建房间
	local create_room_message = { c = "cs_create_room", gametype = "ddz"}
	send_json(create_room_message)
end

function CMD.sc_create_room_succ(msg)
	local enter_room_message = { c = "cs_enter_room", roomid = msg.roomid}
	send_json(enter_room_message)
end

function CMD.sc_enter_room_succ(msg)
	local prepare_message = {c = "cs_prepare"}
	send_json(prepare_message)
end

function CMD.sc_ddz_prepare(msg)
	print("prepare ")
end

function CMD.sc_add_cards(msg)
	print("add_cards")
end

function CMD.sc_ddz_aution(msg)
	print("ddz_aution")
	local msg1 = {c = "cs_aution", score = 3}
	send_json(msg1)
end

function CMD.sc_auction_result(msg)
	print("auction_result")
end

function CMD.sc_auction_cards(msg)
	print("auction_cards")
end

function CMD.sc_ddz_double(msg)
	print("sc_ddz_double")
end

function CMD.sc_play_pass(msg)
	print("play pass pos", msg.pos)
end

function CMD.sc_ddz_wait_play(msg)
	print("ddz_wait_play " .. msg.pos)
	if msg.pos == 3 then
		cards = {}
		cards["3"] = 3
		local info = {c = "cs_play", cards = cards}
		send_json(info)
	end
end

function CMD.sc_play(msg)
	print("play")
end

local function dispatch_package()
	while true do
		local v
		v = recv_package()
		if not v  or v == "" then
			break
		end

		print(v)
		local a = json.decode(v)
		print("a = " .. a.c)
		local handle = CMD[a.c]
		handle(a)
	end
end

send_json({ c="cs_login",openid=9999})
while true do
	dispatch_package()
	local cmd = socket.readstdin()
	if cmd then
		if cmd == "quit" then
			send_request("quit")
		else
			send_request("get", { what = cmd })
		end
	else
		socket.usleep(100)
	end
end