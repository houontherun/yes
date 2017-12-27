// TypeScript file

class PlayerData{
    private userid:number;
    private gold:number    //玩家金钱
    private bankgold:number  //玩家银行的钱
    private diamond:number //玩家钻石
    private card:number    //房卡数量
    private openid:string //openid
    private name:string //名字
    private sex:number

    constructor(loginData){
        this.userid = loginData.userid
        this.gold = loginData.gold
        this.bankgold = loginData.bankgold
        this.diamond = loginData.diamond
        this.card = loginData.card
        this.openid = loginData.openid
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
        if(data.openid != undefined && data.openid != null){
            this.openid = data.openid
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
    public get OpenId():string {
        return this.openid
    }
    public get Name():string {
        return this.name
    }
    public get Sex():number {
        return this.sex
    }
    public getResourceNumById(itemId:number):number{
        switch(itemId){
            case 1001:
                return this.gold
            case 1002:
                return this.card
            default:
                return 0                
        }
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
        MessageManager.Instance.addEventListener(constant.msg.SC_CHANGE_BANK_PASSWD, this.onModifyBankPwdRet, this)
        MessageManager.Instance.addEventListener(constant.msg.SC_CHARGE, this.onCharge, this)
        MessageManager.Instance.addEventListener(constant.msg.SC_BUY, this.onBuyItem, this)
    }
    private onLoginRet(data):void{
        if(data.ret != 0){
            return
        }
        this._data = new PlayerData(data)
        this.dispatchEvent(constant.event.logic.on_player_data_update, this._data)
    }

    // 请求存钱
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
    // 请求取钱
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
    // 请求赠送
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
    // 收到他人赠送
    private onReciveGold(data):void{
        this.updateData(data)
    }
    // 修改银行密码
    public modifyBankPwd(oldpwd:string, newpwd:string){
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_CHANGE_BANK_PASSWD,
            old:oldpwd,
            pwd:newpwd
        })
    }    
    private onModifyBankPwdRet(data:any):void{
        if(data.ret == 0){
            UIManager.Instance.showNotice(Util.uiText('修改成功'))
        }
    }
    // 充值
    public Charge(id:number):void{
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_CHARGE,
            id:id
        })
    }
    private onCharge(data:any){
        if(data.ret == 0){
            this.updateData(data)
            UIManager.Instance.showNotice(Util.uiText('充值成功'))
        }
    }
    // 购买道具
    public BuyItem(id:number){
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_BUY,
            id:id
        })
    }
    private onBuyItem(data){
        if(data.ret == 0){
            this.updateData({gold:data.gold})
            UIManager.Instance.showNotice(Util.uiText('购买成功'))
        }
    }
}