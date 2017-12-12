// TypeScript file

namespace gameUI{  
    class shopItemRander extends eui.ItemRenderer{

        private isLoaded = false

        constructor() {
			super();
			this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
			this.skinName = "resource/custom_skins/shopItemSkin.exml";
		}
        private getImg(itemId:number):string{
            var src = 'jinbi2_png'
            switch (itemId){
                case 1001:
                src = 'jinbi2_png'
                break;
                case 1002:
                src = 'fangka2_png'
                break;
                case 4001:
                src = 'jipaiqi_png'
                break;
                case 4002:
                src = 'shopexp_png'
                break;
                case 4003:
                src = 'jipaiqi_png'
                break;
                case 4004:
                src = 'shopexp_png'
                break;
            }
            return src
        }

		private onload():void {
            this.isLoaded = true

            this.updateUI()
            this.btnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                if(this.data instanceof ChargeData){
                    PlayerManager.Instance.Charge(this.data.rmb)
                }else if(this.data instanceof ShopData){
                    
                }
            }, this)
		}

        private updateUI():void{ 
            if(!this.isLoaded || this.data == null){
                return
            }
            if(this.data instanceof ChargeData){
                this.txtTitle.text = this.data.num.toString()
                this.txtNum.text = this.data.rmb.toString() + "元"
                this.txtPresent.text = "额外赠送" + this.data.giveNum + this.data.giveItem.name
                this.lblHot.text = "限时"
                this.imgItem.source = this.getImg(this.data.item.id)
            }else if(this.data instanceof ShopData){
                this.txtTitle.text = this.data.item.name
                this.txtNum.text = this.data.item.price.toString()
                this.txtPresent.text = ''
                this.lblHot.text = "热卖"
                this.imgItem.source = this.getImg(this.data.item.id)
            }
        }

		protected dataChanged():void {
            this.updateUI()
		}
        public imgHot:eui.Image;
        public txtTitle:eui.Label;
        public lblHot:eui.Label;
        public imgItem:eui.Image;
        public btnSelect:eui.Image;
        public txtNum:eui.Label;
        public txtPresent:eui.Label;
    }

    const selectSprite = "shopbtnTab_png"
    const unSelectSprite = "goumaidaoju_png"
    const selectColor = 0xf2941a
    const unSelectColor = 0x775022

    export class shop extends gameUI.base {

        public onload():void {
            super.onload();
            this.AddClick(this.btnClose, ()=>{
                this.Close()
            }, this)

            this.tabBtns = [this.btnCharge, this.btnBuy]
            this.tabText = [this.lblCgarge, this.lblbuy]
            //init ui
            this.dataList.itemRenderer = shopItemRander
            this.listView.viewport = this.dataList
            var layout = new eui.TileLayout()
            layout.columnWidth = 210
            layout.rowHeight = 260
            this.dataList.layout = layout
            layout.requestedColumnCount = 4

            var items = DataManager.Instance.getJsonData("items")
            this.chargeDatas = []
            for(var k in items.Recharge){
                var chargeData = new ChargeData(items.Recharge[k])
                this.chargeDatas.push(chargeData)
            }
            this.shopDatas = []
            for(var k in items.Shop){
                var shopData = new ShopData(items.Shop[k])
                this.shopDatas.push(shopData)
            }

            this.btnCharge.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.loadTab(0)
                this.loadData(this.chargeDatas)
            }, this)  
            this.btnBuy.addEventListener( egret.TouchEvent.TOUCH_TAP, ()=>{
                this.loadTab(1)
                this.loadData(this.shopDatas)
            }, this)  
            this.loadTab(0)
            this.loadData(this.chargeDatas)
        }

        public onUnload():void{
            super.onUnload()
        }
        private loadData(data):void{
            this.dataList.dataProvider = new eui.ArrayCollection(data)   
            this.listView.horizontalScrollBar = null
            this.listView.verticalScrollBar = null 
        }
        
        private loadTab(index:number):void{
            if(this.currentTabIndex == index){
                return
            }
            this.currentTabIndex = index
            for(var i = 0; i < 2; i++){
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


        private tabBtns:Array<eui.Image>
        private tabText:Array<eui.Label>

        public btnClose:eui.Image;
        public btnCharge:eui.Image;
        public btnBuy:eui.Image;
        public lblCgarge:eui.Label;
        public lblbuy:eui.Label;
        public listView:eui.Scroller;
        public dataList:eui.List;

        private currentTabIndex:number = -1

        private chargeDatas = []
        private shopDatas = []
    }

}