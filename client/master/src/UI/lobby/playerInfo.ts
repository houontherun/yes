// TypeScript file


namespace gameUI{   
    export class playerInfo extends gameUI.base {
        public onload():void {
            super.onload();
            this.AddClick(this.btnClose, ()=>{
                this.Close()
            }, this)
            
        }
        public txtGameId:eui.Label;
        public txtLevel:eui.Label;
        public lblLevel:eui.Label;
        public lblUsername:eui.Label;
        public btnClose:eui.Image;
        public btnModifyBankPwd:eui.Image;
        public lblGameId:eui.Label;
        public btnModifyLoginPwd:eui.Image;
        public txtTitle:eui.Label;
        public txtModifyLoginPwd:eui.Label;
        public txtModifyBankPwd:eui.Label;
        public btnModifyUsername:eui.Image;
        public imghead:eui.Image;
        public txtModifyUsername:eui.Label;
        public btnModifyHead:eui.Image;
        public txtModifyHead:eui.Label;
        public txtUsername:eui.Label;
    }
}