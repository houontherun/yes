// TypeScript file
var constant = {
    //connect_ip : "192.168.12.3", // 候
    connect_ip: "192.168.12.1",
    connect_port: 8000,
    msg: {
        //客户端->服务端		
        CS_LOGIN: 1001,
        CS_CREATE_ROOM: 1002,
        CS_ENTER_ROOM: 1003,
        CS_LEAVE_ROOM: 1004,
        CS_LOGOUT: 1005,
        CS_SAVE_MONEY: 1006,
        CS_WITHDRAW_MONEY: 1007,
        CS_GIVE_GOLD_2_OTHER: 1008,
        CS_CHANGE_BANK_PASSWD: 1020,
        CS_GET_BANK_RECORD: 1021,
        CS_GET_RANK: 1022,
        CS_USER_SIT_DOWN: 1009,
        CS_USER_STAND_UP: 1010,
        CS_USER_READY: 1011,
        CS_CHILD_GAME_MESSAGE: 1012,
        CS_QUERY_ROOM_INFO: 1013,
        CS_MAX: 1999,
        //服务端->客户端
        SC_LOGIN: 2001,
        SC_CREATE_ROOM: 2002,
        SC_ENTER_ROOM: 2003,
        SC_LEAVE_ROOM: 2004,
        SC_PLAYER_ENTER_ROOM: 2005,
        SC_PLAYER_LEAVE_ROOM: 2006,
        SC_LOGOUT: 2007,
        SC_ROOM_LIST: 2008,
        SC_SAVE_MONEY: 2009,
        SC_WITHDRAW_MONEY: 2010,
        SC_GIVE_GOLD_2_OTHER: 2011,
        SC_RECV_OTHER_GOLD: 2012,
        SC_CHANGE_BANK_PASSWD: 2020,
        SC_GET_BANK_RECORD: 2021,
        SC_GET_RANK: 2022,
        SC_USER_SIT_DOWN: 2013,
        SC_TABLE_INFO: 2014,
        SC_USER_STATUS: 2015,
        SC_USER_STAND_UP: 2016,
        SC_USER_READY: 2017,
        SC_CHILD_GAME_MESSAGE: 2018,
        SC_GAME_MESSAGE: 2019,
        SC_QUERY_ROOM_INFO: 2023,
        SC_MAX: 2999,
    },
    error_code: {
        ERROR_OK: 0,
        ERROR_NOT_ENOUTH_GOLD: 1,
        ERROR_NOT_ENOUTH_BANK_GOLD: 2,
        ERROR_INVAID_UID: 3,
        ERROR_ROOM_IS_NOT_EXIST: 4,
        ERROR_ROOM_IS_IN_ROOM: 5,
        ERROR_ROOM_PLAYER_IS_FULL: 6,
        ERROR_USER_PLAYING: 7,
        ERROR_NO_TABLE: 8,
        ERROR_OTHER_TABLE_SIT: 9,
        ERROR_TABLE_BAN_SIT_DOWN: 10,
        ERROR_GAME_IS_STARTED: 11,
        ERROR_CHAIR_IS_SITTING: 12,
        ERROR_GOLD_IS_NOT_ENOUGH: 13,
    },
    event: {
        network: {
            on_connect_succeed: "on_connect_succeed",
            on_connect_failed: "on_connect_failed",
            on_socket_error: "on_socket_error",
            on_connect_close: "on_server_close"
        },
        logic: {
            on_player_data_update: "on_player_data_update"
        },
        doudizhu: {
            on_rec: "onrec",
        }
    }
};
//# sourceMappingURL=constant.js.map