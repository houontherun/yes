
// 登录ui


namespace gameUI{
    export class login extends gameUI.base {
        private test(){
            var indexA = this.txtAccount.text.split(',')
            var indexB = this.txtPassword.text.split(',')
            var pockA = []
            var pockB = []
            for(var i = 0; i < indexA.length; i++){
                pockA.push(Card.Util.createPokerCard(parseInt(indexA[i])))
            }
            for(var i = 0; i < indexB.length; i++){
                pockB.push(Card.Util.createPokerCard(parseInt(indexB[i])))
            }

            // 组合测试
            // var A = new Card.ddzPackCardGroup(pockA)
            // var B = new Card.ddzPackCardGroup(pockB)
            // var msg = A.CardType.toString() + '\r\n'
            // msg += B.CardType.toString() + '\r\n'
            // msg += A.isPress(B).toString()
            // UIManager.Instance.showNotice(msg)

            // 压死测试
            var A = new Card.ddzPackCardGroup(pockA)
            var B = new Card.ddzHandCards(pockB)
            var pressed = B.getPressedCards(A)
            var allMsg = ''
            for(var i = 0; i < pressed.length; i++){
                var msg = ''
                for(var j = 0; j < pressed[i].length; j++){
                    msg += pressed[i][j].Index.toString()
                }
                allMsg += msg + '\r\n'
            }
            UIManager.Instance.showNotice(allMsg)
        }
        public initText(){
            this.lblAccount.text = this.text(1101001)
            this.lblPassword.text = this.text(1101002)
            this.btnRegister.text = this.text(1101004)
            this.btnForgetPwd.text = this.text(1101008)
            this.lblLogin.text = this.text(1101003)
            this.txtAccount.prompt = this.text(1102122)
            this.txtPassword.prompt = this.text(1102123)
        }
        public onload():void {
            super.onload();
            this.initText()
            this.btnLogin.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                if(ConnectionManager.Instance.isConnected){
                    this.requestLogin()
                }else{
                    ConnectionManager.Instance.connect(constant.connect_ip, constant.connect_port, ()=>{
                        this.requestLogin()
                    }, this)
                }
                // this.test()
            }, this );      

            var storageUserName = Util.getItem('username')   
            if(storageUserName != null){
                this.txtAccount.text = storageUserName
            }   
            var storagePassword = Util.getItem('password')
            if(storagePassword != null){
                this.txtPassword.text = storagePassword
            }

            this.btnWeixin.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                UIManager.Instance.showNotice('暂未实现')
            }, this );   
            this.btnQQ.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                UIManager.Instance.showNotice('暂未实现')
            }, this );   
            this.btnForgetPwd.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                if(ConnectionManager.Instance.isConnected){
                    UIManager.Instance.LoadUI(UI.forgetPwd)
                }else{
                    ConnectionManager.Instance.connect(constant.connect_ip, constant.connect_port, ()=>{
                        UIManager.Instance.LoadUI(UI.forgetPwd)
                    }, this)
                }
            }, this );   
            this.btnRegister.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                if(ConnectionManager.Instance.isConnected){
                    UIManager.Instance.LoadUI(UI.register)
                }else{
                    ConnectionManager.Instance.connect(constant.connect_ip, constant.connect_port, ()=>{
                        UIManager.Instance.LoadUI(UI.register)
                    }, this)
                }
            }, this );
        }
        
        private requestLogin():void{
            LoginManager.Instance.loginPlatform(this.txtAccount.text, this.txtPassword.text, this.onLoginRet, this)
        }
        
        private onLoginRet(data):void{
            if(data.ret != 0){
                return
            }
            Util.setItem('username', this.txtAccount.text)
            Util.setItem('password', this.txtPassword.text)
            
            this.Close()
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
                        if(data.game_id > 0 && data.room_id > 0 && data.table_id != constant.INVALID && data.chair_id != constant.INVALID){
                            GameManager.Instance.startGame(data.game_id)
                        }
                    }, (current, total)=>{
                        loadingUI.setProgress(Math.floor(current * 100 / total))
                    })
                }, this);
                timer.start()                
            }, this)
        }
        public btnRegister:eui.Label;
        public lblAccount:eui.Label;
        public lblPassword:eui.Label;
        public btnWeixin:eui.Image;
        public btnQQ:eui.Image;
        public txtPassword:eui.EditableText;
        public btnLogin:eui.Image;
        public lblLogin:eui.Label;
        public txtAccount:eui.EditableText;
        public btnForgetPwd:eui.Label;


    }
}
