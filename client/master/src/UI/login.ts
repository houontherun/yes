
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

                // var game_data:Array<Object> = [
                //     {
                //         type_name:"0扑克",
                //         icon:"default.png",
                //         childs:[
                //             {
                //                 id:100,
                //                 name:"0斗地主",
                //                 icon:"resource/assets/bg.png"
                //             },
                //             {
                //                 id:101,
                //                 name:"斗牛",
                //                 icon:"resource/assets/bg.png"
                //             },
                //             {
                //                 id:102,
                //                 name:"炸金花",
                //                 icon:"resource/assets/bg.png"
                //             },
                //             {
                //                 id:103,
                //                 name:"21点",
                //                 icon:"resource/assets/bg.png"
                //             }
                //         ]
                //     },
                //     {
                //         type_name:"1麻将",
                //         icon:"default.png",
                //         childs:[
                //             {
                //                 id:104,
                //                 name:"1江西麻将",
                //                 icon:"resource/assets/bg.png"
                //             },
                //             {
                //                 id:105,
                //                 name:"湖南麻将",
                //                 icon:"resource/assets/bg.png"
                //             },
                //             {
                //                 id:106,
                //                 name:"四川麻将",
                //                 icon:"resource/assets/bg.png"
                //             },
                //             {
                //                 id:107,
                //                 name:"福建麻将",
                //                 icon:"resource/assets/bg.png"
                //             },
                //             {
                //                 id:108,
                //                 name:"上海麻将",
                //                 icon:"resource/assets/bg.png"
                //             },
                //             {
                //                 id:109,
                //                 name:"杭州麻将",
                //                 icon:"resource/assets/bg.png"
                //             },
                //             {
                //                 id:110,
                //                 name:"火星麻将",
                //                 icon:"resource/assets/bg.png"
                //             }
                //         ]
                //     },
                //     {
                //         type_name:"2棋类",
                //         icon:"default.png",
                //         childs:[
                //             {
                //                 id:111,
                //                 name:"2开心消消乐",
                //                 icon:"resource/assets/bg.png"
                //             }
                //         ]
                //     }
                // ];
                // this.onLoginSucceed(game_data);
            }, this );
        }
        
        private onConSucceed():void{
            NetworkManager.Instance.removeEventListener(constant.event.network.on_connect_succeed, this.onConSucceed, this)
            this.requestLogin();
        }

        private requestLogin():void{
            MessageManager.Instance.once(constant.msg.sc_login_succ, this.onLoginSucceed, this)
            MessageManager.Instance.once(constant.msg.sc_login_failed, this.onLoginFailed, this)
            MessageManager.Instance.SendMessage({
                c:constant.msg.cs_login,
                openid:9999
            })
        }
        
        private onLoginSucceed(data):void{
            this.Close();
            UIManager.Instance.LoadUI(UI.lobby, data);
        }
        
        private onLoginFailed(data):void{
            console.log("login failed")
        }

        private txtUserName:eui.TextInput;
        private txtPassword:eui.TextInput;
        
        private btnLogin:eui.Button;
    }
}
