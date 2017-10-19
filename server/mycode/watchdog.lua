local skynet = require "skynet"
local json = require "json"
local socket = require "skynet.socket"
local netpack = require "websocketnetpack"
local CMD = {}
local SOCKET = {}
local gate
local fd2agent = {}
local dbproxy
local fd2addr = {} -- bind fd to ip
local rollcenter = {} -- 记录登录成功之后的uid 和 agent 的关系，可用来做断线重连


--[[
	可以起到一个RollCenter的作用，会接受所有gate的请求
	会记录所有玩家的agent
]]

function SOCKET.open(fd, addr)
	print("new connection " .. fd .. addr)
	--agent[fd] = skynet.newservice("agent")
	--skynet.call(agent[fd], "lua", "start", { gate = gate, client = fd, watchdog = skynet.self() })
	fd2addr[fd] = addr
	skynet.call(gate, "lua", "openclient", fd)
end

-- 断线重连需要考虑不一样的处理
local function close_agent(fd)
	local a = fd2agent[fd]
	fd2agent[fd] = nil
	if a then
		skynet.call(gate, "lua", "kick", fd)
		-- disconnect never return
		skynet.send(a, "lua", "disconnect")
	end
end

function SOCKET.close(fd)
	print("socket close",fd)
	fd2addr[fd] = nil
	close_agent(fd)
end

function SOCKET.error(fd, msg)
	print("socket error",fd, msg)
	fd2addr[fd] = nil
	close_agent(fd)
end

function SOCKET.warning(fd, size)
	-- size K bytes havn't send out in fd
	print("socket warning", fd, size)
end

local function login(fd, addr, data)
	local sdkid = data.openid -- TODO:skdid 是可以唯一的，但要注意不同的渠道，最好前面添加渠道的标志
	local token = data.accesstoken -- TODO:token 需要验证
	if ~skdid then
		return
	end

	if not dbproxy then
		dbproxy = skynet.uniqueservice("dbproxy")
	end
	local userdata = skynet.call(dbproxy, "lua", "get", sdkid)
	if ~userdata then
		print("new register")
		local userid = sdkid
		userdata = {userid = userid, entityid=userid, name=("random"..sdkid), gold = 10000, diamond = 100, card = 10}
		skynet.call(dbproxy, "lua", "set", sdkid, userdata)
	end
	print("userdata login and will detect onlineinfo")
	-- if rollcenter[sdkid]
	fd2agent[fd] = skynet.newservice("agent")
	skynet.call(fd2agent[fd], "lua", "start", { gate = gate, client = fd, ip = addr, watchdog = skynet.self(), userdata = userdata})
end

function SOCKET.data(fd, msg)
	print("process login "..msg)
	socket.write(fd, netpack.pack(msg))
	local ok, m = pcall(json.decode, msg)
	if ok then
		if m.c == "cs_login" then
			skynet.fork(login, fd, fd2addr[fd], m)
		end
	end
end

function CMD.start(conf)
	skynet.error("fuck the skynet")
	skynet.call(gate, "lua", "open" , conf)
end

function CMD.close(fd)
	close_agent(fd)
end

skynet.start(function()
	skynet.dispatch("lua", function(session, source, cmd, subcmd, ...)
		if cmd == "socket" then
			local f = SOCKET[subcmd]
			f(...)
			-- socket api don't need return
		else
			local f = assert(CMD[cmd])
			skynet.ret(skynet.pack(f(subcmd, ...)))
		end
	end)

	gate = skynet.newservice("wsgate")
end)
