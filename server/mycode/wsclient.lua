package.cpath = "luaclib/?.so"
package.path = "lualib/?.lua;mycode/?.lua"
local json = require "json"

if _VERSION ~= "Lua 5.3" then
	error "Use lua 5.3"
end

local socket = require "clientwebsocket"

local fd = assert(socket.connect("127.0.0.1", 8888))


local function send_package(fd, pack)
	-- local package = string.pack(">s2", pack)
	socket.send(fd, pack)
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

local function send_json(data)
	local str = json.encode(data)
	send_package(fd, str)
end


local last = ""


local function dispatch_package()
	while true do
		local v
		v = recv_package()
		if not v  or v == "" then
			break
		end

		print(v)
	end
end

send_package(fd,"handshake")
send_json({ what = "hello", value = "world, websoket" })
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
