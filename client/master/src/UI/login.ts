
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
            // alert(msg)

            // 压死测试
            var A = new Card.ddzHandCards(pockA)
            var B = new Card.ddzPackCardGroup(pockB)
            var pressed = A.getPressedCards(B)
            var allMsg = ''
            for(var i = 0; i < pressed.length; i++){
                var msg = ''
                for(var j = 0; j < pressed[i].length; j++){
                    msg += pressed[i][j].Index.toString()
                }
                allMsg += msg + '\r\n'
            }
            alert(allMsg)
        }
        private preloadResource(){
            this.Close()
            UIManager.Instance.LoadUI(UI.loading, null, ()=>{
                var timer = new egret.Timer(500, 1)
                timer.addEventListener(egret.TimerEvent.TIMER, ()=>{
                    var loadingUI = <gameUI.loading>UIManager.Instance.GetChild(UI.loading)
                    var groups = [
                        "preload",
                        "lobby",
                        "common"
                    ]
                    ResourceManager.Instance.loadGroups(groups, this, ()=>{
                        this.requestLogin()
                        loadingUI.Close()
                    }, (current, total)=>{
                        loadingUI.setProgress(Math.floor(current * 100 / total))
                    })
                }, this);
                timer.start()                
            }, this)
        }
        public onload():void {
            super.onload();
            this.btnLogin.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                if(ConnectionManager.Instance.isConnected){
                    this.preloadResource()
                }else{
                    ConnectionManager.Instance.connect(constant.connect_ip, constant.connect_port, ()=>{
                        this.preloadResource()
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
                alert('暂未实现')
            }, this );   
            this.btnQQ.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                alert('暂未实现')
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
                alert('登录失败code=' + data.ret.toString())
                return
            }
            Util.setItem('username', this.txtAccount.text)
            Util.setItem('password', this.txtPassword.text)
            
            UIManager.Instance.LoadUI(UI.lobby);
        }
        public btnWeixin:eui.Image;
        public btnQQ:eui.Image;
        public btnForgetPwd:eui.Image;
        public btnRegister:eui.Image;
        public txtPassword:eui.EditableText;
        public btnLogin:eui.Image;
        public txtAccount:eui.EditableText;

    }
}
