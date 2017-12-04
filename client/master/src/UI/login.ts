
// 登录ui


namespace gameUI{
    export class login extends gameUI.base {
        public onload():void {
            super.onload();
            (<eui.Label>this.btnLogin.labelDisplay).size = 50;
            (<eui.EditableText>this.txtUserName.textDisplay).size = 30;
            (<eui.EditableText>this.txtPassword.textDisplay).size = 30;
            this.btnLogin.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
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

                NetworkManager.Instance.addEventListener(constant.event.network.on_connect_succeed, this.onConSucceed, this);
                NetworkManager.Instance.Connect(constant.connect_ip, constant.connect_port);

                // ----- for test -------
                // this.onConSucceed()
                // ----------------------
            }, this );      

            var storageUserName = Util.getItem('username')   
            if(storageUserName != null){
                this.txtUserName.text = storageUserName
            }   
        }
        
        private onConSucceed():void{
            NetworkManager.Instance.removeEventListener(constant.event.network.on_connect_succeed, this.onConSucceed, this)
            this.requestLogin();
        }

        private requestLogin():void{
            MessageManager.Instance.addEventListener(constant.msg.SC_LOGIN, this.onLoginRet, this)
            MessageManager.Instance.SendMessage({
                protocol:constant.msg.CS_LOGIN,
                openid:this.txtUserName.text
            })

            // ----- for test --------
            // var lgdata = {
            //     userid : 10086,
            //     gold:512,
            //     bankgold:3000,
            //     diamond:12,
            //     card:3,
            //     openid:"test",
            //     name:"itol",
            //     sex:1,
            //     error:0,
            //     protocol:2001,
            // }
            // MessageManager.Instance.DispatchMessage(lgdata)
            // ---------------------------
        }
        
        private onLoginRet(data):void{
            if(data.ret != 0){
                console.log("login error code=" + data.ret)
                return
            }
            Util.setItem('username', this.txtUserName.text)
            this.Close();
            UIManager.Instance.LoadUI(UI.lobby);
        }
        
        private txtUserName:eui.TextInput;
        private txtPassword:eui.TextInput;
        
        private btnLogin:eui.Button;
    }
}
