// TypeScript file

// 注册


namespace gameUI{
    export class register extends gameUI.base {
        public initText(){
            this.lblAccount.text = this.text(1101001)
            this.lblPassword.text = this.text(1101002)
            this.lblRegister.text = this.text(1101004)
            this.txtAccount.prompt = this.text(1101006)
            this.txtPassword.prompt = this.text(1102123)
            this.lblOtherAccount.text = this.text(1101007)
            this.lblWexin.text = this.text(1102130)
            this.lblQQ.text = this.text(1102131)
            this.lblPhone.text = this.text(1102132)
            this.lblPlat.text = this.text(1102133)
        }
        public onload():void {
            super.onload();
            this.initText()
            this.btnRegister.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.account = this.txtAccount.text
                this.password = this.txtPassword.text
                if(this.account.trim().length < 6){
                    UIManager.Instance.showNotice(this.text(1101006))
                    return
                }
                LoginManager.Instance.registerPlatform(this.account, this.password, this.onRegister, this)
            }, this );      

            this.btnWeixin.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                UIManager.Instance.showNotice('暂未实现')
            }, this );  

            
            this.btnQQ.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                UIManager.Instance.showNotice('暂未实现')
            }, this );  
            
            this.btnPhone.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                UIManager.Instance.LoadUI(UI.phoneRegister)
            }, this );  
            
            this.btnFanqi.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                UIManager.Instance.showNotice('暂未实现')
            }, this );  
            
            this.btnClose.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.Close()
                UIManager.Instance.LoadUI(UI.login)
            }, this ); 
        }
        private onRegister(data){
            if(data.ret != 0){
                return
            }
            LoginManager.Instance.loginPlatform(this.account, this.password, (d)=>{
                if(d.ret != 0){
                    return
                }
                Util.setItem('username', this.account)
                Util.setItem('password', this.password)
                UIManager.Instance.LoadUI(UI.loading, null, ()=>{
                    var timer = new egret.Timer(500, 1)
                    timer.addEventListener(egret.TimerEvent.TIMER, ()=>{
                        var loadingUI = <gameUI.loading>UIManager.Instance.GetChild(UI.loading)
                        var groups = [
                            "common",
                            "lobby"
                        ]
                        for(var type in Application.ChildGames){
                            var games = Application.ChildGames[type]
                            for(var i = 0; i < games.length; i++){
                                if(games[i].ResName.length > 0){
                                    groups.push(games[i].ResName)
                                }
                            }
                        }
                        ResourceManager.Instance.loadGroups(groups, this, ()=>{
                            loadingUI.Close()
                            UIManager.Instance.LoadUI(UI.lobby)
                        }, (current, total)=>{
                            loadingUI.setProgress(Math.floor(current * 100 / total))
                        })
                    }, this);
                    timer.start()                
                }, this)
            }, this)
        }        

        private account:string
        private password:string

        public lblWexin:eui.Label;
        public lblQQ:eui.Label;
        public lblPhone:eui.Label;
        public lblPlat:eui.Label;
        public lblAccount:eui.Label;
        public lblPassword:eui.Label;
        public txtPassword:eui.EditableText;
        public btnRegister:eui.Image;
        public lblRegister:eui.Label;
        public txtAccount:eui.EditableText;
        public lblOtherAccount:eui.Label;
        public btnWeixin:eui.Image;
        public btnQQ:eui.Image;
        public btnPhone:eui.Image;
        public btnFanqi:eui.Image;
        public btnClose:eui.Image;

    }
}