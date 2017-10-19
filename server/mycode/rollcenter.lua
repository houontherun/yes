---
--- Created by hou.
--- DateTime: 2017/10/11 17:28
---
local skynet = require("skynet")
local CMD = {}
local online_roll = {}

function CMD.add()
end

function CMD.del() end

function CMD.get() end



skynet.start(function ()
    skynet.dispatch("lua", function( session, source, cmd, ...)
        local f = CMD[cmd]
        if f then
            skynet.ret(skynet.pack(f(...)))
        else
            skynet.error("RollCenter Unknow Command "..cmd)
        end
    end)
    skynet.register("OnlineRole")
end)