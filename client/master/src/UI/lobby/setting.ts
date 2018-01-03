// TypeScript file


namespace gameUI{    
    class settingLanguageItemRander extends eui.ItemRenderer{
        public txtLan:eui.Label;
        private isLoaded = false

        constructor() {
			super();
			this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
			this.skinName = "resource/custom_skins/settingLanguageItem.exml";
            this.isLoaded = false
		}

		private onload():void {
            this.isLoaded = true
            this.txtLan.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                var settingUI = UIManager.Instance.GetChild(UI.setting)
                if(settingUI != null){
                    settingUI.onSelectLanguage(this.data)                    
                }
            }, this)
            this.updateUI()
		}
        private updateUI(){
            if(!this.isLoaded || this.data == null){
                return
            }
            this.txtLan.text = this.data.name       
        }
		protected dataChanged():void {
            this.updateUI()  
		}
    }

    export class setting extends gameUI.base {
        public initText(){
            this.txtTitle.text = this.text(1102019)
            this.lblLogout.text = this.text(1102070)
            this.lblQuitGame.text = this.text(1102069)

            this.lblLan.text = this.text(1102064)
            this.lblMus.text = this.text(1102062)
            this.lblEff.text = this.text(1102063)
        }
        public onload():void {
            super.onload();
            this.initText()
            this.AddClick(this.btnClose, ()=>{
                this.Close()
            }, this)

            
            this.svData.initItemRenderer(settingLanguageItemRander)
            this.svData.bindData(DataManager.Instance.getLanguageList())
            
            this.imgSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                this.svData.visible = !this.svData.visible
            }, this)
            this.svData.visible = false

            // console.log(this.sliderMusic.thumb.source)

            // var slidr = new gameUIControl.Slider()
            // this.addChild(slidr)
        }

        public onSelectLanguage(data:any){
            this.txtLang.text = data.name;
            this.svData.visible = false    
            UIManager.Instance.Language = data.field        
        }
        public btnClose:eui.Image;
        public svData:gameUI.Scrollview;

        public imgSelect:eui.Image;
        public txtLang:eui.Label;
        public txtTitle:eui.Label;
        
        public lblQuitGame:eui.Label;
        public lblLogout:eui.Label;
 
        public sliderMusic:gameUIControl.Slider;
        public sliderEffect:gameUIControl.Slider;
        
        public lblLan:eui.Label;
        public lblMus:eui.Label;
        public lblEff:eui.Label;

    }

}