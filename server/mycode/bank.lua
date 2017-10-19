---
--- Created by admin.
--- DateTime: 2017/10/13 15:02
---

local skynet = require "skynet"

local CMD = {}

skynet.start(function()
	skynet.dispatch("lua", function(_,_, command, ...)
		local f = CMD[command]
		skynet.ret(skynet.pack(f(...)))
	end)
end)