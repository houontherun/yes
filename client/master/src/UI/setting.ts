// TypeScript file


namespace gameUI{    
    class settingLanguageItemRander extends eui.ItemRenderer{
        public txtLan:eui.Label;

        constructor() {
			super();
			this.skinName = "resource/custom_skins/settingLanguageItem.exml";
			this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
		}

		private onload():void {
            console.log("onload")
            this.txtLan.text = this.data.text
            this.txtLan.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                var settingUI = UIManager.Instance.GetChild(UI.setting)
                if(settingUI != null){
                    settingUI.onSelectLanguage(this.data.text)                    
                }
            }, this)
		}
		protected dataChanged():void {
            console.log("dataChanged")
            if(this.txtLan != undefined && this.txtLan != null){
                this.txtLan.text = this.data.text
            }
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
            this.dataList.itemRenderer = settingLanguageItemRander
            this.dataList.itemRendererSkinName = "resource/custom_skins/settingLanguageItem.exml"
            var languages:Array<Object> = [
                {text : "中文"},
                {text : "英文"},
                {text : "日文"},
                {text : "鸟语"},
                {text : "兽语"},
            ]
            this.dataList.dataProvider = new eui.ArrayCollection(languages) 
            // this.svData.bindData(languages)
            
            this.imgSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                this.svData.visible = !this.svData.visible
            }, this)
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
    }

}