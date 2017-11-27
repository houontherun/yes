
// 登录ui


namespace gameUI{
    export class login extends gameUI.base {
        public onload():void {
            super.onload();
            (<eui.Label>this.btnLogin.labelDisplay).size = 50;
            (<eui.EditableText>this.txtUserName.textDisplay).size = 30;
            (<eui.EditableText>this.txtPassword.textDisplay).size = 30;
            this.btnLogin.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                NetworkManager.Instance.addEventListener(constant.event.network.on_connect_succeed, this.onConSucceed, this);
                NetworkManager.Instance.Connect(constant.connect_ip, constant.connect_port);

                // var lgdata = {
                //     userid : 10086,
                //     gold:512,
                //     bankgold:3000,
                //     diamond:12,
                //     card:3,
                //     openid:"test",
                //     name:"itol",
                //     error:0,
                // }
                // this.onLoginRet(lgdata)
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
                openid:this.txtUserName.text
            })
        }
        
        private onLoginRet(data):void{
            if(data.error != 0){
                console.log("login error code=" + data.error)
                return
            }
            this.Close();
            UIManager.Instance.LoadUI(UI.lobby);
        }
        
        private txtUserName:eui.TextInput;
        private txtPassword:eui.TextInput;
        
        private btnLogin:eui.Button;
    }
}
