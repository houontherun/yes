// TypeScript file

class PlayerData{
    private userid:number;
    private gold:number    //玩家金钱
    private bankgold:number  //玩家银行的钱
    private diamond:number //玩家钻石
    private card:number    //房卡数量
    private account:string //openid
    private name:string //名字
    private sex:number

    constructor(loginData){
        this.userid = loginData.userid
        this.gold = loginData.gold
        this.bankgold = loginData.bankgold
        this.diamond = loginData.diamond
        this.card = loginData.card
        this.account = loginData.openid
        this.name = loginData.name
        this.sex = loginData.sex
    }
    public Update(data:any):void{
        if(data.userid != undefined && data.userid != null){
            this.userid = data.userid
        }
        if(data.gold != undefined && data.gold != null){
            this.gold = data.gold
        }
        if(data.bankgold != undefined && data.bankgold != null){
            this.bankgold = data.bankgold
        }
        if(data.diamond != undefined && data.diamond != null){
            this.diamond = data.diamond
        }
        if(data.card != undefined && data.card != null){
            this.card = data.card
        }
        if(data.account != undefined && data.account != null){
            this.account = data.account
        }
        if(data.name != undefined && data.name != null){
            this.name = data.name
        }
        if(data.sex != undefined && data.sex != null){
            this.sex = data.sex
        }
    }

    public get UserId():number {
        return this.userid
    }
    public get Gold():number {
        return this.gold
    }
    public get BankGold():number {
        return this.bankgold
    }
    public get Diamond():number {
        return this.diamond
    }
    public get Cardnum():number {
        return this.card
    }
    public get Account():string {
        return this.account
    }
    public get Name():string {
        return this.name
    }
    public get Sex():number {
        return this.sex
    }
}

class PlayerManager extends Dispatcher {
    public static Instance : PlayerManager = new PlayerManager();
    constructor() {
        super();
    }    

    private _data:PlayerData;
    public get Data():PlayerData{
        return this._data
    }
    private updateData(data:any):void{
        this._data.Update(data)
        this.dispatchEvent(constant.event.logic.on_player_data_update, this._data)
    }

    public Init():void{
        MessageManager.Instance.addEventListener(constant.msg.SC_LOGIN, this.onLoginRet, this)
        MessageManager.Instance.addEventListener(constant.msg.SC_SAVE_MONEY, this.onSaveMoneyRet, this)
        MessageManager.Instance.addEventListener(constant.msg.SC_WITHDRAW_MONEY, this.onWithdrawGoldRet, this)
        MessageManager.Instance.addEventListener(constant.msg.SC_GIVE_GOLD_2_OTHER, this.onGiveGoldRet, this)
        MessageManager.Instance.addEventListener(constant.msg.SC_RECV_OTHER_GOLD, this.onReciveGold, this)
    }
    private onLoginRet(data):void{
        if(data.error != 0){
            return
        }
        this._data = new PlayerData(data)
        this.dispatchEvent(constant.event.logic.on_player_data_update, this._data)
    }

    public SaveGold(num):void{
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_SAVE_MONEY,
            gold:num
        })
    }
    private onSaveMoneyRet(data):void{
        if(data.ret != 0){
            console.log('save gold failed error code = ' + data.ret)
            return
        }
        this.updateData(data)
    }
    public WithdrawGold(num):void{
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_WITHDRAW_MONEY,
            gold:num
        })
    }
    private onWithdrawGoldRet(data):void{
        if(data.ret != 0){
            console.log('withdraw gold failed error code = ' + data.ret)
            return
        }
        this.updateData(data)
    }
    public GiveGold(num, uid):void{
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_GIVE_GOLD_2_OTHER,
            gold:num,
            uid:uid
        })
    }
    private onGiveGoldRet(data):void{
        if(data.ret != 0){
            console.log('withdraw gold failed error code = ' + data.ret)
            return
        }
        this.updateData(data)
    }
    private onReciveGold(data):void{
        this.updateData(data)
    }
}