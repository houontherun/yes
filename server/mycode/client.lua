---
--- Created by hou.
--- DateTime: 2017/10/11 17:46
---

if _VERSION ~= "Lua 5.3" then
	error "Use lua 5.3"
end

--local socket = require "client.socket"
local socket = require "clientwebsocket"
local json = require "json"

local fd = assert(socket.connect("127.0.0.1", 8888))

local function send_package(fd, pack)
    print(pack)
	local package = string.pack(">s2", pack)
    print(package)
	socket.send(fd, package)
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

local function recv_package(last)
	local result
	result, last = unpack_package(last)
	if result then
		return result, last
	end
	local r = socket.recv(fd)
	if not r then
		return nil, last
	end
	if r == "" then
		error "Server closed"
	end
	return unpack_package(last .. r)
end

local session = 0

local function send_json(args)
    local data = json.encode(args)
    send_package(fd, data)
end

local last = ""

local function dispatch_package()
	while true do
		local v
		v, last = recv_package(last)
		if not v then
			break
		end

		print_package(host:dispatch(v))
	end
end

send_request("handshake")
send_request("set", { what = "hello", value = "world" })
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