// TypeScript file

// 玩家状态
enum UserStatus {
    US_NULL = 0x00,								//没有状态
    US_FREE = 0x01,								//站立状态
    US_SIT = 0x02,								//坐下状态
    US_READY = 0x03,							//同意状态
    US_LOOKON = 0x04,							//旁观状态
    US_PLAYING = 0x05,							//游戏状态
    US_OFFLINE = 0x06,							//断线状态
}

class RoomData{
    private player_count:number
    private room_id:number

    constructor(room_data){
        this.player_count = room_data.player_count
        this.room_id = room_data.room_id
    }

    public get PlayerCount():number {   return this.player_count  }
    public get RoomId():number {   return this.room_id }
    
    public Update(data:any):void{
        if(data.player_count != undefined && data.player_count != null){  this.player_count = data.player_count }
        if(data.room_id != undefined && data.room_id != null){  this.room_id = data.room_id }
    }
}
class UserData{
    private room_id:number //所在房间ID
    private user_id:number // 玩家ID
    private status:number // 当前状态
    private table_id:number //  当前桌号
    private chair_id:number //  当前椅子号
    private user_name:string //玩家名字
    private face_id:number  // 头像索引
    private gold:number     // 当前金币

    public get RoomId():number { return this.room_id }
    public get UserId():number { return this.user_id }
    public get Status():number { return this.status }
    public get TableId():number { return this.table_id }
    public get ChairId():number { return this.chair_id }
    public get UserName():string { return this.user_name }
    public get FaceId():number { return this.face_id }
    public get Gold():number { return this.gold }

    constructor(data){
        this.room_id = data.room_id
        this.user_id = data.user_id
        this.status = data.status
        this.table_id = data.table_id
        this.chair_id = data.chair_id
        this.user_name = data.user_name
        this.face_id = data.face_id
        this.gold = data.gold
    }

    public Update(data:any):void{
        if(data.room_id != undefined && data.room_id != null){  this.room_id = data.room_id }
        if(data.user_id != undefined && data.user_id != null){  this.user_id = data.user_id }
        if(data.status != undefined && data.status != null){  this.status = data.status }
        if(data.table_id != undefined && data.table_id != null){  this.table_id = data.table_id }
        if(data.chair_id != undefined && data.chair_id != null){  this.chair_id = data.chair_id }
        if(data.user_name != undefined && data.user_name != null){  this.user_name = data.user_name }
        if(data.face_id != undefined && data.face_id != null){  this.face_id = data.face_id }
        if(data.gold != undefined && data.gold != null){  this.gold = data.gold }
    }
}
class TableData{
    private table_id:number //  当前桌号
    private chairs = {} //key=chair_id value=user_id

    constructor(data){
        this.table_id = data.table_id
        for(var i = 0; i < data.chairs.length; i++){
            this.chairs[data.chairs[i].chair_id] = data.chairs[i].user_id
        }
    }
    public get TableId():number { return this.table_id }

    public UpdateUser(user:UserData):void{
        if(user.Status >= UserStatus.US_SIT){
            this.chairs[user.ChairId] = user.UserId
        }        
    }
    public RemoveUser(user:UserData):void{
        if(this.chairs[user.ChairId] != undefined && this.chairs[user.ChairId] != null){
            this.chairs[user.ChairId] = null
        }
    }
    public GetUserByChairId(chair_id:number):number{
        if(this.chairs[chair_id] != undefined && this.chairs[chair_id] != null && this.chairs[chair_id] != 0xFFFF){
            return this.chairs[chair_id]
        }
        return null
    }
}
class EnterRoomData{
    private users = []
    private tables = []
    private tablesDic = {}
    constructor(data){
        for(var i = 0; i < data.users.length; i++){
            var ud = new UserData(data.users[i])
            this.users.push(ud)
        }
        for(var i = 0; i < data.tables.length; i++){
            var td = new TableData(data.tables[i])
            this.tables.push(td)
            this.tablesDic[td.TableId] = td
        }
    }
    public AddUser(data):void{
        var ud = new UserData(data)
        this.users.push(ud)
        if(this.tablesDic[ud.TableId] != undefined && this.tablesDic[ud.TableId] != null){
            this.tablesDic[ud.TableId].UpdateUser(ud)
        }
    }
    public RemoveUser(data):void{
        for(var i = this.users.length - 1; i >= 0; i--){
            if(this.users[i].UserId == data.user_id){
                if(this.tablesDic[this.users[i].TableId] != undefined && this.tablesDic[this.users[i].TableId] != null){
                    this.tablesDic[this.users[i].TableId].RemoveUser(this.users[i])
                }
                this.users.splice(i, 1)
            }
        }
    }
    public UpdateUser(data):void{
        for(var i = this.users.length - 1; i >= 0; i--){
            if(this.users[i].UserId == data.user_id){
                this.users[i].Update(data)
                if(this.tablesDic[this.users[i].TableId] != undefined && this.tablesDic[this.users[i].TableId] != null){
                    this.tablesDic[this.users[i].TableId].UpdateUser(this.users[i])
                }
            }
        }
    }
    public get Tables() { return this.tables }
    public get Users() { return this.users }
}

class RoomManager extends Dispatcher {
    public static Instance : RoomManager = new RoomManager();
    constructor() {
        super();
    }

    private roomList = []
    public currentRoom:EnterRoomData = null

    public Init():void{
        MessageManager.Instance.addEventListener(constant.msg.SC_ROOM_LIST, this.onRoomListRet, this)    
        MessageManager.Instance.addEventListener(constant.msg.SC_ENTER_ROOM, this.onEnterRoomRet, this)  
        MessageManager.Instance.addEventListener(constant.msg.SC_QUERY_ROOM_INFO, this.onQueryRoomInfoRet, this)    
        MessageManager.Instance.addEventListener(constant.msg.SC_LEAVE_ROOM,  this.onLeaveRoomRet, this)    
        MessageManager.Instance.addEventListener(constant.msg.SC_PLAYER_ENTER_ROOM,  this.onPlayerEnterRoom, this)  
        MessageManager.Instance.addEventListener(constant.msg.SC_PLAYER_LEAVE_ROOM,  this.onPlayerLeaveRoom, this)  
        MessageManager.Instance.addEventListener(constant.msg.SC_USER_SIT_DOWN,  this.onPlayerSitDown, this)  
        MessageManager.Instance.addEventListener(constant.msg.SC_USER_STATUS ,  this.onPlayerStateUpdate, this)  
        MessageManager.Instance.addEventListener(constant.msg.SC_USER_STAND_UP,  this.onPlayerStandup, this)  
    }

    private onRoomListRet(data:any):void{
        for(var i = 0; i < data.room_list.length; i++){
            var rd = new RoomData(data.room_list[i])
            this.roomList.push(rd)
        }
    }

    public get RoomList(){
        return this.roomList
    }

    // 请求进入房间
    public EnterRoom(id:number):void{
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_ENTER_ROOM,
            room_id:id
        })
    }
    private onEnterRoomRet(data:any):void{
        if(data.ret == 0){
            // do nothing
        }
    }
    public queryRoomInfo():void{
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_QUERY_ROOM_INFO
        })
    }
    private onQueryRoomInfoRet(data:any):void{
        if(data.ret == 0){
            this.currentRoom = new EnterRoomData(data)
        }
    }
    // 请求离开房间
    public LevelRoom():void{
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_LEAVE_ROOM
        })
    }
    private onLeaveRoomRet(data:any):void{ // 同时推送SC_ROOM_LIST消息
        if(data.ret == 0){
            this.currentRoom = null
        }
    }
    // 有玩家进入
    private onPlayerEnterRoom(data:any):void{
        if(data.ret == 0){
            if(this.currentRoom != null && this.currentRoom != undefined){
                this.currentRoom.AddUser(data)
            }
        }
    }
    // 有玩家离开     
    private onPlayerLeaveRoom(data:any):void{
        if(data.ret == 0){
            if(this.currentRoom != null && this.currentRoom != undefined){
                this.currentRoom.RemoveUser(data)
            }
        }
    }
    // 坐下
    public SitDown(tableId:number, chairId:number):void{
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_USER_SIT_DOWN,
            table_id:tableId,
            chair_id:chairId
        })
    }
    private onPlayerSitDown(data:any):void{
        if(data.ret == 0){
        }
    }
    // 起来
    public Standup():void{
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_USER_STAND_UP
        })
    }
    private onPlayerStandup(data:any):void{
        // do nothing
    }

    // 玩家状态改变
    private onPlayerStateUpdate(data:any):void{
        if(data.ret == 0){
            if(this.currentRoom != null && this.currentRoom != undefined){
                this.currentRoom.UpdateUser(data)
            }
        }
    }

}