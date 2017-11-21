// TypeScript file

var constant = {
    connect_ip : "192.168.12.3",
    connect_port: 4567,
    msg:{
        cs_login : "cs_login",                              // 登录
        sc_login_succ : "sc_login_succ",                    // 登录成功
        sc_login_failed : "sc_login_failed",                // 登录失败
        cs_create_room : "cs_create_room",                  // 开房间
        sc_create_room_succ : "sc_create_room_succ",        // 开房间成功
        sc_create_room_failed : "sc_create_room_failed",    // 开房间失败
        cs_enter_room : "cs_enter_room",                    // 进入房间
        sc_enter_room_succ : "sc_enter_room_succ",          // 进入房间成功
        sc_create_player : "sc_create_player",              // 通知有玩家进入房间
        sc_destory_player : "sc_destory_player",            // 通知有玩家离开房间
        cs_leave_room : "cs_leave_room",                    // 离开房间
        sc_leave_room_ret : "sc_leave_room_ret",            // 确认离开房间

        cs_prepare:"cs_prepare",    // 点击准备
        cs_auction:"cs_auction",    // 抢地主
        cs_double:"cs_double",      // 加倍
        cs_play:"cs_play",          // 出牌
        cs_pass:"cs_pass",          // 不出牌，过
        cs_mandate:"cs_mandate",    // 托管
    },
    event:{
        network:{
            on_connect_succeed:"on_connect_succeed",
            on_connect_failed:"on_connect_failed",
            on_socket_error:"on_socket_error",
            on_connect_close:"on_server_close"
        },
        doudizhu:{
            on_rec:"onrec",
        }
    }
}