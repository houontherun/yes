// TypeScript file

namespace gameUI{
    export enum ScrollLayout{
        Vertical = 0,
        Horizontal = 1,
        Tile = 2,
    }
    export class Scrollview extends eui.Component {
        private dataList:eui.List = null;
        private isLoaded:boolean = false;
        private itemRenderer:any = null;
        private itemSkinName:any = null
        private data:Array<Object>;
        private sv:eui.Scroller;

        private scrollLayout:ScrollLayout;

        constructor() {
            super();
            this.isLoaded = false
            this.itemSkinName = null
            this.itemRenderer = null
            this.data = null        
            this.scrollLayout = ScrollLayout.Vertical    

            this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
            this.skinName = "resource/custom_skins/controls/ScrollviewSkin.exml";
        }
        private onload():void {
            this.isLoaded = true
            this.sv.viewport = this.dataList;
            this.initScrollLayout(this.scrollLayout)

            if(this.itemSkinName != null){
                this.initItemSkin(this.itemSkinName)
            }
            if(this.itemRenderer != null){
                this.initItemRenderer(this.itemRenderer)
            }
            if(this.data != null){
                this.bindData(this.data)
            }
        }
        public initScrollLayout(sl:ScrollLayout){
            this.scrollLayout = sl
            if(this.isLoaded){
                var layout
                if(this.scrollLayout == ScrollLayout.Vertical){
                    layout = new eui.VerticalLayout()
                    this.sv.scrollPolicyH = 'off'
                    this.sv.scrollPolicyV = 'on'
                }else{
                    layout = new eui.HorizontalLayout()
                    this.sv.scrollPolicyH = 'on'
                    this.sv.scrollPolicyV = 'off'
                }
                layout.gap = 0;
                layout.horizontalAlign = egret.HorizontalAlign.CONTENT_JUSTIFY;
                this.dataList.layout = layout;
            }
        }
        public initItemSkin(itemSkin: any): void {
            this.itemSkinName = itemSkin      
            if(this.isLoaded){
                this.dataList.itemRendererSkinName = this.itemSkinName
            }
        }
        public initItemRenderer(itemRenderer: any): void {
            this.itemRenderer = itemRenderer
            if(this.isLoaded){
                this.dataList.itemRenderer = this.itemRenderer
            }
        }
        public bindData(data: Array<any>): void {
            this.data = data
            if(this.isLoaded){
                this.dataList.dataProvider = new eui.ArrayCollection(this.data)   
                this.sv.horizontalScrollBar = null
                this.sv.verticalScrollBar = null   
            }
        }
        public get DataList():eui.List{
            return this.dataList
        }
        public get Scroller():eui.Scroller{
            return this.sv
        }
        
    }
}
