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

        private updateUI():void{ //// list []{uid, name, score, rank}
            if(this.data.rank == 0){
                this.imgIndex.source = "rank_1_png"
                this.imgBg.source = "rank_bg2_png"
                this.txtIndex.visible = false
            }else if(this.data.rank == 1){
                this.imgIndex.source = "rank_2_png"
                this.imgBg.source = "rank_bg3_png"
                this.txtIndex.visible = false
            }else if(this.data.rank == 2){
                this.imgIndex.source = "rank_3_png"
                this.imgBg.source = "rank_bg4_png"
                this.txtIndex.visible = false
            }else{
                this.imgIndex.source = "rank_index_png"
                this.imgBg.source = "rank_bg4_png"
                this.txtIndex.visible = true
            }
            this.txtName.text = this.data.name.toString()
            this.txtValue.text = this.data.score.toString()
            this.txtIndex.text = (this.data.rank + 1).toString()
        }

		protected dataChanged():void {
            if(this.imgBg != undefined && this.imgBg != null){
                this.updateUI()
            }
		}
    }

    const selectSprite = "rank_tab_png"
    const unSelectSprite = "rank_tab2_png"
    const selectColor = 0xf2941a
    const unSelectColor = 0x775022

    export class rank extends gameUI.base {

        public onload():void {
            super.onload();
            this.AddClick(this.btnClose, ()=>{
                this.Close()
            }, this)

            this.tabBtns = [this.btnGold, this.btnCredit, this.btnCharm]
            this.tabText = [this.lblGold, this.lblCredit, this.lblCharm]

            // this.svData.initItemRenderer(rankItemRander)
            // this.svData.initItemSkin("resource/custom_skins/rankItemSkin.exml")
            this.dataList.itemRenderer = rankItemRander
            this.dataList.itemRendererSkinName = "resource/custom_skins/rankItemSkin.exml"

            MessageManager.Instance.addEventListener(constant.msg.SC_GET_RANK, this.onGetRankList, this)   

            this.btnGold.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.loadTab(0)
                this.getRankList(0, 1)
            }, this)  
            this.btnCredit.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.loadTab(1)
                this.getRankList(0, 2)
            }, this)  
            this.loadTab(0)
            this.getRankList(0, 1)
        }

        public onUnload():void{
            super.onUnload()
            MessageManager.Instance.removeEventListener(constant.msg.SC_GET_RANK, this.onGetRankList, this)
        }
        
        private loadTab(index:number):void{
            if(this.currentTabIndex == index){
                return
            }
            this.currentTabIndex = index
            for(var i = 0; i < 3; i++){
                if(i == this.currentTabIndex){
                    this.tabBtns[i].source = selectSprite
                    this.tabText[i].textColor = selectColor
                }
                else{
                    this.tabBtns[i].source = unSelectSprite
                    this.tabText[i].textColor = unSelectColor
                }
            }
        }      

        // 获取操行榜  1是金币排行榜，2是信用排行榜
        private getRankList(begin:number, type:number):void{
            MessageManager.Instance.SendMessage({
                protocol:constant.msg.CS_GET_RANK,
                begin:begin,
                type:type
            })
        }
        private onGetRankList(data:any):void{   
            // if(data.ret == 0){ 
                this.dataList.dataProvider = new eui.ArrayCollection(data.rank) 
                if(data.type == 1){
                    this.txtScore.text = "金币"
                }
                else if(data.type == 2){
                    this.txtScore.text = "信用"
                }
            // }
        }

        private tabBtns:Array<eui.Image>
        private tabText:Array<eui.Label>

        public btnClose:eui.Image;
        // public svData:gameUI.Scrollview;
        public svData:eui.Scroller;
        public dataList:eui.List;
        public btnGold:eui.Image;
        public btnCredit:eui.Image;
        public btnCharm:eui.Image;
        public lblGold:eui.Label;
        public lblCredit:eui.Label;
        public lblCharm:eui.Label;

        private currentTabIndex:number = -1
        public txtRank:eui.Label;
        public txtName:eui.Label;
        public txtScore:eui.Label;
    }

}