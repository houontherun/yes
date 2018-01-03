// TypeScript file


namespace gameUI{   
    export class playerInfo extends gameUI.base {
        public initText(){
            this.txtTitle.text = this.text(1102021)
            this.lblLevel.text = this.text(1102124)
            this.lblUsername.text = this.text(1102022)
            this.lblGameId.text = this.text(1102023)
            this.txtModifyLoginPwd.text = this.text(1102026)
            this.txtModifyBankPwd.text = this.text(1102027)
            this.txtModifyUsername.text = this.text(1102024)
            this.txtModifyHead.text = this.text(1102024)
        }
        public onload():void {
            super.onload();
            this.initText()
            this.AddClick(this.btnClose, ()=>{
                this.Close()
            }, this)
            this.AddClick(this.btnModifyBankPwd, ()=>{
                
            }, this)
            this.AddClick(this.btnModifyLoginPwd, ()=>{
                UIManager.Instance.LoadUI(UI.modifyPwd)
            }, this)

            this.txtGameId.text = PlayerManager.Instance.Data.UserId.toString()
            this.txtUsername.text = PlayerManager.Instance.Data.Name
            this.txtLevel.text = '0' + this.text(1102125) 
        }
        public txtGameId:eui.Label;
        public txtLevel:eui.Label;
        public lblLevel:eui.Label;
        public lblUsername:eui.Label;
        public lblGameId:eui.Label;
        public txtTitle:eui.Label;
        public txtModifyLoginPwd:eui.Label;
        public txtModifyBankPwd:eui.Label;
        public txtModifyUsername:eui.Label;
        public txtModifyHead:eui.Label;
        public txtUsername:eui.Label;
        public btnClose:eui.Image;
        public btnModifyBankPwd:eui.Image;
        public btnModifyLoginPwd:eui.Image;
        public btnModifyUsername:eui.Image;
        public imghead:eui.Image;
        public btnModifyHead:eui.Image;
    }
}