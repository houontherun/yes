// TypeScript file

var constant = {
    // connect_ip : "192.168.12.3", // 候
    // connect_ip : "192.168.12.1", // 谭
    // connect_ip:"fanqinet.tpddns.cn",
    connect_ip:"47.96.11.32", // 外网测试服
    connect_port: 8000,
    msg:{
        //客户端->服务端
        CS_PLATFORM_REGISTER : 1988,   //注册
        CS_PLATFORM_LOGIN : 1989,      //平台账号密码登录
        CS_PLATFORM_CHANGE_PWD : 1990,
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
        CS_MODIFY_USER_INFO : 1023,		//修改玩家信息
        CS_REENTER_PLAYING : 1025,		//重新进入游戏
        CS_CREATE_HALL_TABLE : 1026,	//创建大厅桌子
        CS_JOIN_CUSTOM_TABLE : 1027,	//加入自定义桌子
        CS_TALK : 1040,
        CS_CHARGE : 1050,
        CS_BUY : 1052,
        CS_MAX : 1999,

        //服务端->客户端        
        SC_PLATFORM_REGISTER : 2988,   //注册回包
        SC_PLATFORM_LOGIN : 2989,      //平台账号密码登录回包
        SC_PLATFORM_CHANGE_PWD : 2990,
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
        SC_USER_IS_PLAYING : 2026,		//玩家正在其他桌子玩游戏
        SC_REENTER_PLAYING : 2027,		//玩家重新进入游戏桌子回包
        SC_CREATE_HALL_TABLE : 2028,	//创建大厅房间回包
        SC_JOIN_CUSTOM_TABLE : 2029,	//加入自定义桌子回包
        SC_NEXT_CUSTOM_TABLE_GAME_START : 2030,	//下一局自定义游戏开始倒计时
        SC_CUSTOM_GAME_RESULT : 2031,	//自定义桌子游戏记录
        SC_TALK : 2040,                 //有人发言
        SC_BROADCAST : 2041,            //跑马灯	
        SC_CHARGE : 2050,
        SC_BUY : 2052,
	    SC_MAX : 2999,
    },
    sub_msg:{
        //客户端->服务端
        SUB_C_LAND_SCORE:1,            //用户叫分
        SUB_C_OUT_CART:2,             //用户出牌
        SUB_C_PASS_CARD:3,            //放弃出牌
        SUB_C_TRUSTEE:4,              //托管消息
        SUB_C_BRIGHT:5,               //用户明牌
        SUB_C_DOUBLE:6,               //用户加倍

        //服务端->客户端
        SUB_S_SEND_CARD:100,              //发牌命令
        SUB_S_LAND_SCORE:101,             //叫分命令
        SUB_S_GAME_START:102,           //游戏开始
        SUB_S_OUT_CARD:103,             //用户出牌
        SUB_S_PASS_CARD:104,            //放弃出牌
        SUB_S_GAME_END:105,             //游戏结束
        SUB_S_USER_BRIGHT:106,            //用户明牌
        SUB_S_USER_DOUBLE:107,           //用户加倍
        SUB_S_SET_BASESCORE:108,         //设置基数
        SUB_S_TRUSTEE:109,               //玩家托管
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
    INVALID:0xFFFF,								//无效椅子
    event:{
        network:{
            on_connect_succeed:"on_connect_succeed",
            on_connect_failed:"on_connect_failed",
            on_socket_error:"on_socket_error",
            on_connect_close:"on_server_close"
        },
        logic:{
            on_get_room_list:"on_get_room_list",
            on_player_data_update:"on_player_data_update",
            on_table_info_update:"on_table_info_update",
            on_query_room_info:"on_query_room_info",
            on_self_enter_room:"on_self_enter_room",
            on_self_leave_room:"on_self_leave_room",
            on_self_sit_down:"on_self_sit_down",
            on_self_stand_up:"on_self_stand_up",
            on_player_enter_room:"on_player_enter_room",
            on_player_leave_room:"on_player_leave_room",
            on_table_users_update:"on_table_users_update",
            on_create_custom_table:"on_create_custom_table",
            on_join_custom_table:"on_join_custom_table",
            on_new_chat_data:"on_new_chat_data",
            on_start_game:"on_start_game",
            on_exit_game:"on_exit_game",
        },
        doudizhu:{
            on_rec:"onrec",
        }
    }
}