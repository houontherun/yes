// TypeScript file

var constant = {
    connect_ip : "192.168.12.3",
    connect_port: 4567,
    msg:{
        //客户端->服务端		
        CS_LOGIN : 1001,				//登录
        CS_CREATE_ROOM : 1002,			//创建房间
        CS_ENTER_ROOM : 1003,			//玩家进入房间
        CS_LEAVE_ROOM : 1004,			//玩家离开房间
        CS_LOGOUT : 1005,				//玩家退出登录

        //服务端->客户端
        SC_LOGIN : 2001,				//登录回包			
        SC_CREATE_ROOM : 2002,			//创建房间回包
        SC_ENTER_ROOM : 2003,			//玩家进入房间回包
        SC_LEAVE_ROOM : 2004,			//玩家离开房间回包
        SC_PLAYER_ENTER_ROOM : 2005,	//玩家进入房间通知
        SC_PLAYER_LEAVE_ROOM : 2006,	//玩家离开房间通知
        SC_LOGOUT : 2007,				//玩家退出登录回包
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