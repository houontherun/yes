---
--- Created by hou.
--- DateTime: 2017/10/11 17:12
---

local skynet = require("skynet")
require "skynet.manager"
local CMD = {}
local db = {}

function CMD.set(key, value)
    db[key] = value
end

function CMD.get(key)
    return db[key]
end

skynet.start(function ()
    skynet.dispatch("lua", function (session, source, cmd, ...)
        local f = CMD[cmd]
        if f then
            skynet.ret(skynet.pack(f(...)))
        else
            skynet.error("Unknown command " .. cmd)
        end
    end )
    skynet.register("DBProxy")
end)