// TypeScript file

namespace gameUI{    
    class rankItemRander extends eui.ItemRenderer{
                
        public imgBg:eui.Image;
        public imgIndex:eui.Image;
        public txtName:eui.Label;
        public imgType:eui.Image;
        public txtValue:eui.Label;
        public txtIndex:eui.Label;

        constructor() {
			super();
			this.skinName = "resource/custom_skins/rankItemSkin.exml";
			this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
		}

		private onload():void {
            this.updateUI()
		}

        private updateUI():void{
            if(this.data.index == 1){
                this.imgIndex.source = "rank_1_png"
                this.imgBg.source = "rank_bg2_png"
                this.txtIndex.visible = false
            }else if(this.data.index == 2){
                this.imgIndex.source = "rank_2_png"
                this.imgBg.source = "rank_bg3_png"
                this.txtIndex.visible = false
            }else if(this.data.index == 3){
                this.imgIndex.source = "rank_3_png"
                this.imgBg.source = "rank_bg4_png"
                this.txtIndex.visible = false
            }else{
                this.imgIndex.source = "rank_index_png"
                this.imgBg.source = "rank_bg4_png"
                this.txtIndex.visible = true
            }
            this.txtName.text = this.data.name
            this.txtValue.text = this.data.value
            this.txtIndex.text = this.data.index
        }

		protected dataChanged():void {
            if(this.imgBg != undefined && this.imgBg != null){
                this.updateUI()
            }
		}
    }

    export class rank extends gameUI.base {

        public onload():void {
            super.onload();
            this.AddClick(this.btnClose, ()=>{
                this.Close()
            }, this)

            // this.svData.initItemRenderer(rankItemRander)
            // this.svData.initItemSkin("resource/custom_skins/rankItemSkin.exml")
            this.dataList.itemRenderer = rankItemRander
            this.dataList.itemRendererSkinName = "resource/custom_skins/rankItemSkin.exml"
            var rankData:Array<Object> = [
                {index:1, name: "张三", value:50000},
                {index:2, name: "李四", value:40000},
                {index:3, name: "王五", value:30000},
                {index:4, name: "老六", value:20000},
                {index:5, name: "三本地", value:10000},
                {index:6, name: "枯霜地有", value:9000},
                {index:7, name: "支付宝", value:5000},
                {index:8, name: "钱我残", value:4000},
                {index:9, name: "工工工", value:3000},
                {index:10, name: "顶替", value:2000},
                {index:11, name: "于地", value:1000},
                {index:12, name: "擤", value:400},
                {index:13, name: "夺一的", value:300},
            ]
            // this.svData.bindData(rankData)   
            this.dataList.dataProvider = new eui.ArrayCollection(rankData)          
        }

        public btnClose:eui.Image;
        // public svData:gameUI.Scrollview;
        public svData:eui.Scroller;
        public dataList:eui.List;

    }

}