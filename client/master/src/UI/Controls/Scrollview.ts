// TypeScript file

namespace gameUI{
    export class Scrollview extends eui.Scroller implements eui.UIComponent {
        public dataList:eui.List = null;
        private isLoaded:boolean = false;
        private itemRenderer:any = null;
        private itemSkinName:any = null
        private data:Array<Object>;

        public constructor() {
            super();
            this.skinName = "resource/custom_skins/controls/ScrollviewSkin.exml";
            this.viewport = this.dataList;
            this.once( eui.UIEvent.COMPLETE, this.onload, this);
        }
        private onload():void {
            this.isLoaded = true
            this.dataList.itemRendererSkinName = this.itemSkinName
            this.dataList.itemRenderer = this.itemRenderer
            this.dataList.dataProvider = new eui.ArrayCollection(this.data)            
        }
        public initItemSkin(itemSkin: any): void {
            this.itemSkinName = itemSkin            
        }
        public initItemRenderer(itemRenderer: any): void {
            this.itemRenderer = itemRenderer
        }
        public bindData(data: Array<any>): void {
            this.data = data
            if(this.isLoaded){
                this.dataList.dataProvider = new eui.ArrayCollection(this.data)
            }
        }
    }
}
