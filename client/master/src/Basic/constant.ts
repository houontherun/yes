// TypeScript file

var constant = {
    //connect_ip : "192.168.12.3", // 候
     connect_ip : "192.168.12.1", // 谭
    connect_port: 8000,
    msg:{
        //客户端->服务端		
        CS_LOGIN : 1001,				//登录
        CS_CREATE_ROOM : 1002,			//创建房间
        CS_ENTER_ROOM : 1003,			//玩家进入房间
        CS_LEAVE_ROOM : 1004,			//玩家离开房间
        CS_LOGOUT : 1005,				//玩家退出登录
        CS_SAVE_MONEY : 1006,           // 存钱
        CS_WITHDRAW_MONEY : 1007,       // 取钱
        CS_GIVE_GOLD_2_OTHER : 1008,    // 赠送   
        CS_CHANGE_BANK_PASSWD : 1020,   //修改银行密码
        CS_GET_BANK_RECORD : 1021,      //获取转赠记录
        CS_GET_RANK : 1022,             //获取排行榜
        CS_QUERY_TABLE_USER_INFO:1024,   //玩家请求桌子玩家列表
        CS_USER_SIT_DOWN : 1009,		//玩家坐下
        CS_USER_STAND_UP : 1010,		//玩家起立
        CS_USER_READY : 1011,			//玩家准备
        CS_CHILD_GAME_MESSAGE : 1012,	//子游戏消息
	    CS_QUERY_ROOM_INFO : 1013,		//查询房间信息
        CS_MAX : 1999,

        //服务端->客户端
        SC_LOGIN : 2001,				//登录回包			
        SC_CREATE_ROOM : 2002,			//创建房间回包
        SC_ENTER_ROOM : 2003,			//玩家进入房间回包
        SC_LEAVE_ROOM : 2004,			//玩家离开房间回包
        SC_PLAYER_ENTER_ROOM : 2005,	//玩家进入房间通知
        SC_PLAYER_LEAVE_ROOM : 2006,	//玩家离开房间通知
        SC_LOGOUT : 2007,				//玩家退出登录回包
        SC_ROOM_LIST : 2008,			//房间列表
        SC_SAVE_MONEY : 2009,           //存钱回包
        SC_WITHDRAW_MONEY : 2010,       //取钱回包
        SC_GIVE_GOLD_2_OTHER : 2011,    //赠送别人金币回包
        SC_RECV_OTHER_GOLD : 2012,      //收到别人金币
        SC_CHANGE_BANK_PASSWD : 2020,   //修改银行密码回包
        SC_GET_BANK_RECORD : 2021,      //获取转赠记录回包
        SC_GET_RANK : 2022,             //获取排行榜回包

        SC_USER_SIT_DOWN : 2013,		//玩家坐下回包
        SC_TABLE_INFO : 2014,			//桌子信息
        SC_USER_STATUS : 2015,			//用户状态更新
        SC_USER_STAND_UP : 2016,		//玩家站立回包
        SC_USER_READY : 2017,			//玩家准备回包
        SC_CHILD_GAME_MESSAGE : 2018,	//子游戏消息
	    SC_GAME_MESSAGE : 2019,			//游戏信息，包括聊天等,显示用
	    SC_QUERY_ROOM_INFO : 2023,		//推送房间信息
        SC_TABLE_PLAYER_INFO : 2025,	//桌子上玩家信息
	    SC_MAX : 2999,
    },
    error_code:{
        ERROR_OK : 0,
        ERROR_NOT_ENOUTH_GOLD : 1,
        ERROR_NOT_ENOUTH_BANK_GOLD : 2,
        ERROR_INVAID_UID : 3,
        ERROR_ROOM_IS_NOT_EXIST : 4,					//房间不存在
        ERROR_ROOM_IS_IN_ROOM : 5,						//玩家已在这个房间
        ERROR_ROOM_PLAYER_IS_FULL : 6,					//房间玩家已满
        ERROR_USER_PLAYING : 7,							//正在游戏进行中
        ERROR_NO_TABLE : 8,								//没有这个桌子
        ERROR_OTHER_TABLE_SIT : 9,						//你正在其他桌子，无法坐下
        ERROR_TABLE_BAN_SIT_DOWN : 10,					//当前桌子禁止用户进入
        ERROR_GAME_IS_STARTED : 11,						//游戏已经开始，不能进入
        ERROR_CHAIR_IS_SITTING : 12,					//这个位置已被别人捷足先登了
        ERROR_GOLD_IS_NOT_ENOUGH : 13,					//金币不足，无法进入
    },
    event:{
        network:{
            on_connect_succeed:"on_connect_succeed",
            on_connect_failed:"on_connect_failed",
            on_socket_error:"on_socket_error",
            on_connect_close:"on_server_close"
        },
        logic:{
            on_player_data_update:"on_player_data_update"
        },
        doudizhu:{
            on_rec:"onrec",
        }
    }
}