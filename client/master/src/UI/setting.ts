// TypeScript file


namespace gameUI{    
    class settingLanguageItemRander extends eui.ItemRenderer{
        public txtLan:eui.Label;
        private isLoaded = false

        constructor() {
			super();
			this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
			this.skinName = "resource/custom_skins/settingLanguageItem.exml";
		}

		private onload():void {
            this.isLoaded = true
            this.txtLan.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                var settingUI = UIManager.Instance.GetChild(UI.setting)
                if(settingUI != null){
                    settingUI.onSelectLanguage(this.data.text)                    
                }
            }, this)
		}
		protected dataChanged():void {
            if(!this.isLoaded){
                return
            }
            this.txtLan.text = this.data.text            
		}
    }

    export class setting extends gameUI.base {

        public onload():void {
            super.onload();
            this.AddClick(this.btnClose, ()=>{
                this.Close()
            }, this)

            this.svData.visible = false
            // this.svData.initItemRenderer(settingLanguageItemRander)
            // this.svData.initItemSkin("resource/custom_skins/settingLanguageItem.exml")
            var languages:Array<Object> = [
                {text : "中文"},
                {text : "英文"},
                {text : "日文"},
                {text : "鸟语"},
                {text : "兽语"},
            ]
            this.dataList.dataProvider = new eui.ArrayCollection(languages) 
            this.dataList.itemRenderer = settingLanguageItemRander
            
            this.imgSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                this.svData.visible = !this.svData.visible
            }, this)

            // console.log(this.sliderMusic.thumb.source)

            // var slidr = new gameUIControl.Slider()
            // this.addChild(slidr)
        }

        public onSelectLanguage(txt:string){
            this.txtLang.text = txt;
            this.svData.visible = false            
        }
        public btnClose:eui.Image;
        // public svData:gameUI.Scrollview;
        public svData:eui.Scroller;

        public dataList:eui.List;


        public imgSelect:eui.Image;
        public txtLang:eui.Label;
        
        public sliderMusic:gameUIControl.Slider;
        public sliderEffect:gameUIControl.Slider;
    }

}