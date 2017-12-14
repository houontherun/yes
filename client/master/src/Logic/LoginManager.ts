// TypeScript file


class LoginManager extends Dispatcher {
    public static Instance : LoginManager = new LoginManager();
    constructor() {
        super();
    }    

    private onLoginCallback:Function
    private loginObj:any
    private login(openid:string):void{
        MessageManager.Instance.addEventListener(constant.msg.SC_LOGIN, this.onLoginRet, this)
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_LOGIN,
            openid:openid
        })
    }
    private onLoginRet(data):void{
        MessageManager.Instance.removeEventListener(constant.msg.SC_LOGIN, this.onLoginRet, this)
        if(this.onLoginCallback != null){
            this.onLoginCallback.call(this.loginObj, data)
        }
        this.loginObj = null
        this.onLoginCallback = null
    }

    public loginPlatform(account:string, password:string, onLogin:Function, thisObj:any){
        this.onLoginCallback = onLogin
        this.loginObj = thisObj
        MessageManager.Instance.addEventListener(constant.msg.SC_PLATFORM_LOGIN, this.onLoginPlatform, this)
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_PLATFORM_LOGIN,
            account:account,
            pwd:password
        })
    }
    private onLoginPlatform(data){
        MessageManager.Instance.removeEventListener(constant.msg.SC_PLATFORM_LOGIN, this.onLoginPlatform, this)
        if(data.ret == 0){
            this.login(data.openid)
        }else{
            
        }
    }

    private onRegsiterCallback:Function
    private registerObj:any
    public registerPlatform(account:string, pwd:string, onRegsiter:Function, thisObj:any):void{
        MessageManager.Instance.addEventListener(constant.msg.SC_PLATFORM_REGISTER, this.onRegisterPlatform, this)
        this.onRegsiterCallback = onRegsiter
        this.registerObj = thisObj
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_PLATFORM_REGISTER,
            account:account,
            pwd:pwd
        })
    }
    private onRegisterPlatform(data){
        MessageManager.Instance.removeEventListener(constant.msg.SC_PLATFORM_REGISTER, this.onRegisterPlatform, this)
        this.onRegsiterCallback.call(this.registerObj, data)
        this.onRegsiterCallback = null
        this.registerObj = null
    }


    private onChangePlatformPwdCallback:Function
    private changePlatPwdObj:any
    public changePlatformPwd(account:string, oldPwd:string, newPwd:string, onChange:Function, thisObj:any){
        MessageManager.Instance.addEventListener(constant.msg.SC_PLATFORM_CHANGE_PWD, this.onChangePlatformPwd, this)
        this.onChangePlatformPwdCallback = onChange
        this.changePlatPwdObj = thisObj
        MessageManager.Instance.SendMessage({
            protocol:constant.msg.CS_PLATFORM_CHANGE_PWD,
            account:account,
            oldpwd:oldPwd,
            newpwd:newPwd,
        })
    }
    private onChangePlatformPwd(data){
        MessageManager.Instance.removeEventListener(constant.msg.SC_PLATFORM_CHANGE_PWD, this.onChangePlatformPwd, this)
        this.onChangePlatformPwdCallback.call(this.changePlatPwdObj, data)
        this.onChangePlatformPwdCallback = null
        this.changePlatPwdObj = null
    }
}