// TypeScript file

namespace gameUI{
    class rankItemRander extends eui.ItemRenderer{
        public imgBg:eui.Image;
        public txtDate:eui.Label;
        public txtSendId:eui.Label;
        public txtRecvId:eui.Label;
        public txtNumber:eui.Label;
        public imgRemark:eui.Image;

        constructor() {
			super();
			this.skinName = "resource/custom_skins/bankOperItemSkin.exml";
			this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
		}

		private onload():void {
            this.updateUI()
		}

        private updateUI():void{
            
        }

		protected dataChanged():void {
            if(this.imgBg != undefined && this.imgBg != null){
                this.updateUI()
            }
		}
    }
    const selectSprite = "bank_tab_png"
    const unSelectSprite = "bank_tab2_png"
    const selectColor = 0xf2941a
    const unSelectColor = 0x775022
    
    export class bank extends gameUI.base {      
        public onload():void {
            super.onload();
            this.AddClick(this.btnClose, ()=>{
                this.Close()
            }, this)
            this.imgTabGS.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.loadTab(0)
            }, this)            
            this.imgTabGive.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.loadTab(1)
            }, this)            
            this.imgTabRecord.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.loadTab(2)
            }, this)

            this.tabBtns = [this.imgTabGS, this.imgTabGive, this.imgTabRecord]
            this.tabText = [this.txtTabGS, this.txtTabGive, this.txtTabRecord]
            this.tabGroup = [this.groupGS, this.groupGive, this.groupRecord]
            this.loadTab(0)

            // bind oper data
            this.dataList.itemRenderer = rankItemRander
            this.dataList.itemRendererSkinName = "resource/custom_skins/bankOperItemSkin.exml"
            var rankData:Array<Object> = [
                {index:1, name: "张三", value:50000},
                {index:2, name: "李四", value:40000},
            ]
            this.dataList.dataProvider = new eui.ArrayCollection(rankData)         
            PlayerManager.Instance.addEventListener(constant.event.logic.on_player_data_update, this.updateUI, this)
			this.updateUI(PlayerManager.Instance.Data) 
        }

        private updateUI(data):void{
            this.txtCurrent.text = Util.formatNum(data.Gold)
            this.txtTotel.text = Util.formatNum(data.BankGold.toString())           
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
                    this.tabGroup[i].visible = true
                }
                else{
                    this.tabBtns[i].source = unSelectSprite
                    this.tabText[i].textColor = unSelectColor
                    this.tabGroup[i].visible = false
                }
            }
        }
        private currentTabIndex:number = -1
        private tabBtns:Array<eui.Image>
        private tabText:Array<eui.Label>
        private tabGroup:Array<eui.Group>
        
        public btnClose:eui.Image;
        
        public imgTabGS:eui.Image;
        public imgTabGive:eui.Image;
        public imgTabRecord:eui.Image;
        public txtTabGS:eui.Label;
        public txtTabGive:eui.Label;
        public txtTabRecord:eui.Label;

        public groupGS:eui.Group;
        public txtCurrent:eui.Label;
        public txtTotel:eui.Label;
        public txtNum:eui.Label;
        public txtPwd:eui.Label;
        public imgOut:eui.Image;
        public imgIn:eui.Image;
        public txtInNum:eui.EditableText;
        public txtGSBankPwd:eui.EditableText;

        public imgGiveOK:eui.Image;
        public groupGive:eui.Group;
        public txtGiveId:eui.EditableText;
        public txtGiveNum:eui.EditableText;
        public txtBankPwd:eui.EditableText;
        public imgTenW:eui.Image;
        public imgOneQW:eui.Image;
        public imgTenFiveBW:eui.Image;
        public imgOneBaiW:eui.Image;
        public imgOneYi:eui.Image;

        public groupRecord:eui.Group;
        public svData:eui.Scroller;
        public dataList:eui.List;
    }
}