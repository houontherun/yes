---
--- Created by hou.
--- DateTime: 2017/10/13 9:41
---

local skynet = require "skynet"
local Avatar = require "avatar"
require "bjx_table"

local Players = {}
local RoomID
local Game
local GameCount = 0 -- 已经玩了几局游戏
local History = {}

local DouDiZhu = require "doudizhu"

local CMD = {}

local function get_player(uid)
    for _, p in pairs(Players) do
        print("---------------------- " .. table.serialize(p))
        if p.uid == uid then
            return p
        end
    end
end

local function del_player(uid)
    local p = get_player(uid)
    if p then
        table.remove(Players, p.pos)
    end
end

local function get_roominfo()
    local info = {}
    info.roomid = 1
    local playerinfo = {}
    for i = 1, 3 do
        if not Players[i] then
            playerinfo["dd"] = {pos = i, name="test1", ip = "127.0.0.1"}
        end
    end
    info.playerinfo = playerinfo
    return info
end

-- UserID, skynet,self(), ClientIP, UserData
function CMD.enter_room(uid, agent, client_ip, userdata)
    local pos = 0
    for i = 1,3 do
        if not Players[i] then
            pos = i
            break
        end
    end
    if not pos then
        return {c="sc_enter_room_failed", reason="room is full"}
    end

    local player = Avatar.new(uid, agent, client_ip, pos, userdata)
    for _, p in pairs(Players) do
        p:on_other_enter({pos=pos, info=userdata})
    end
    Players[pos] = player
    print("player uid " .. uid .. " sit in pos " .. pos)
    local roominfo = get_roominfo()
    roominfo.c = "sc_enter_room_succ"
    return roominfo
end

local function destory()
    skynet.exit()
end

function CMD.exit_room(uid)
    for _, p in pairs(Players) do
        print("uid " .. uid .. "pp " .. p.uid)
        if p.uid ~= uid then
            p:on_other_leave(uid)
        end
    end

    if table.is_empty_or_nil(Players) then
        print("all player leave the room will destory")
        local roommanager = skynet.uniqueservice("roommanager")
        skynet.call(roommanager, "lua", "on_destory_room", RoomID)
        destory()
    end
end

local function broadcast(msg)
    for _, p in pairs(Players) do
        p:call_client_method(msg)
    end
end

local function check_prepared()
    for pos = 1, 3 do
        if not Players[pos] then
            return false
        end
        if not Players[pos].is_prepare then
            return false
        end
    end
    -- 都准备好，可以开始游戏了
    print("yes, i can !!!!!")
    local msg = {c = "sc_game_start"}
    -- broadcast(msg)
    Game:start(Players[1], Players[2], Players[3])
end

local function add_robot(uid, pos)
    local robot = Avatar.new(uid, nil, "127.0.0.1", pos, {})
    Players[pos] = robot
    robot:prepare()
end

function CMD.prepare(uid)
    -- 检查如果游戏已经开启，返回失败
    local player = get_player(uid)
    assert(player)
    --if not player then
    --    return {c = "sc_prepare_failed", reason = "failed find player"}
    --end
    player:prepare()
    for _, p in pairs(Players) do
        p:on_other_prepare(player.pos)
    end

    check_prepared()
end

function CMD.auction(uid, score)
    print("aution -------------------- ", uid, score)
    Game:on_user_auction(uid, score)
end

function CMD.double(uid, double)
    Game:on_user_double(uid, double)
end

function CMD.play(uid, cards)
    Game:on_user_play(uid, cards)
end

function CMD.pass(uid)
    Game:on_user_pass(uid)
end

function CMD.mandate(uid)
    local player = get_player(uid)
    player.set_trusteeship(ture)
end

function CMD.cancel_mandate(uid)
    local player = get_player(uid)
    player.set_trusteeship(false)
end

function CMD.game_result(result)
    if GameCount > 8 then
        --TODO 房卡模式下这个房间的使命已经完成了
        --TODO 将总的成绩下发给所有玩家
        local msg = {c = "sc_ddz_room_result"}
        local player = {{pos = 1, score = 10, win = 3, lose = 5},
        {pos = 2, score = 15, win = 5, lose = 3},
        {pos = 3, score = 13, win = 4, lose = 4}}
        --player[1] = {pos = 1, score = 10, win = 3, lose = 5}
        --player[2] = {pos = 2, score = 15, win = 5, lose = 3}
        --player[2] = {pos = 3, score = 13, win = 4, lose = 4}
        msg.player = player

    end
end

function CMD:open(roomid, gametype)
    RoomID = roomid
    Game = DouDiZhu.new()
    if not Game then
        return false
    end

    local msg = {c = "sc_ddz_room_result"}
    local player = {} --[[ = {{pos = 1, score = 10, win = 3, lose = 5},
        {pos = 2, score = 15, win = 5, lose = 3},
        {pos = 3, score = 13, win = 4, lose = 4}}]]
        player[1] = {pos = 1, score = 10, win = 3, lose = 5}
        player[2] = {pos = 2, score = 15, win = 5, lose = 3}
        player[3] = {pos = 3, score = 13, win = 4, lose = 4}
        player[5] = {pos = 3, score = 13, win = 4, lose = 4}
    msg.player = player
    local json = require "json"
    local s = json.encode(msg)
    print("HHHHHHHHHHH", s)

    -- 为了方便测试，生成两个机器人
    add_robot(100, 1)
    add_robot(101, 2)
    return true
end



skynet.start(function ()
    skynet.dispatch("lua", function (_, _, cmd, ...)
        local f = assert(CMD[cmd])
        skynet.ret(skynet.pack(f(...)))
    end )
end)