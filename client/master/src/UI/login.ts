
// 登录ui


namespace gameUI{
    export class login extends gameUI.base {
        private test(){
            // var indexA = this.txtUserName.text.split(',')
            // var indexB = this.txtPassword.text.split(',')
            // var pockA = []
            // var pockB = []
            // for(var i = 0; i < indexA.length; i++){
            //     pockA.push(Card.Util.createPokerCard(parseInt(indexA[i])))
            // }
            // for(var i = 0; i < indexB.length; i++){
            //     pockB.push(Card.Util.createPokerCard(parseInt(indexB[i])))
            // }
            // var A = new Card.ddzPackCardGroup(pockA)
            // var B = new Card.ddzPackCardGroup(pockB)
            // var msg = A.CardType.toString() + '\r\n'
            // msg += B.CardType.toString() + '\r\n'
            // msg += A.isPress(B).toString()
            // alert(msg)

            // 压死测试
            // var P = new Card.ddzHandCards(pockB)
            // var pressed = P.getPressedCards(A)
            // var allMsg = ''
            // for(var i = 0; i < pressed.length; i++){
            //     var msg = ''
            //     for(var j = 0; j < pressed[i].length; j++){
            //         if(pressed[i][j] instanceof Array){
            //             for(var k = 0; k < pressed[i][j].length; k++){
            //                 msg += pressed[i][j][k].Index.toString()
            //             }
            //         }else{
            //             msg += pressed[i][j].Index.toString()
            //         }
            //     }
            //     allMsg += msg + '\r\n'
            // }
            // alert(allMsg)
        }
        public onload():void {
            super.onload();
            this.btnLogin.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                NetworkManager.Instance.addEventListener(constant.event.network.on_connect_succeed, this.onConSucceed, this);
                NetworkManager.Instance.Connect(constant.connect_ip, constant.connect_port);
            }, this );      

            var storageUserName = Util.getItem('username')   
            if(storageUserName != null){
                this.txtAccount.text = storageUserName
            }   

            this.btnWeixin.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                alert('暂未实现')
            }, this );   
            this.btnQQ.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                alert('暂未实现')
            }, this );   
            this.btnForgetPwd.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                UIManager.Instance.LoadUI(UI.modifyPwd)
            }, this );   
            this.btnRegister.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                UIManager.Instance.LoadUI(UI.register)
            }, this );
        }
        
        private onConSucceed():void{
            NetworkManager.Instance.removeEventListener(constant.event.network.on_connect_succeed, this.onConSucceed, this)
            this.requestLogin();
        }

        private requestLogin():void{
            MessageManager.Instance.addEventListener(constant.msg.SC_LOGIN, this.onLoginRet, this)
            MessageManager.Instance.SendMessage({
                protocol:constant.msg.CS_LOGIN,
                openid:this.txtAccount.text
            })
        }
        
        private onLoginRet(data):void{
            if(data.ret != 0){
                console.log("login error code=" + data.ret)
                return
            }
            Util.setItem('username', this.txtAccount.text)
            this.Close();
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
