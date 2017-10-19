---
--- Created by hou.
--- DateTime: 2017/10/17 14:57
---

local skynet = require "skynet"

local Avatar = {}

function Avatar:ctor(agent, conf)
    self.agent = agent
end

function Avatar:call_client_method(args)
    skynet.send(self.agent, "lua", "send_message", args)
end

function Avatar:on_other_enter(info)
    info.c = "sc_create_player "
    self.call_client_method(info)
end

function Avatar:on_other_exit(info)
    info.c = "sc_destory_player"
    self.call_client_method(info)
end
