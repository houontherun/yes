// TypeScript file

namespace gameUI{
    export class Scrollview extends eui.Scroller implements eui.UIComponent {
        public dataList:eui.List = null;
        private isLoaded:boolean = false;
        private itemRenderer:any = null;
        private itemSkinName:any = null
        private data:Array<Object>;
        private sv:eui.Scroller;
        
        constructor() {
            super();
            this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
            this.skinName = "resource/custom_skins/controls/ScrollviewSkin.exml";
            this.viewport = this.dataList;
        }
        private onload():void {
            this.isLoaded = true
            this.dataList.itemRendererSkinName = this.itemSkinName
            this.dataList.itemRenderer = this.itemRenderer
            this.dataList.dataProvider = new eui.ArrayCollection(this.data)  
            console.log('bind dataProvider0')
        }
        public initItemSkin(itemSkin: any): void {
            this.itemSkinName = itemSkin      
            if(this.dataList != null && this.dataList != undefined){
                this.dataList.itemRendererSkinName = this.itemSkinName
            }      
        }
        public initItemRenderer(itemRenderer: any): void {
            this.itemRenderer = itemRenderer
            if(this.dataList != null && this.dataList != undefined){
                this.dataList.itemRenderer = this.itemRenderer
            }
        }
        public bindData(data: Array<any>): void {
            this.data = data
            if(this.dataList != null && this.dataList != undefined){
                this.dataList.dataProvider = new eui.ArrayCollection(this.data)                
            }
        }
    }
}
