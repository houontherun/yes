// TypeScript file

namespace gameUI{
    class rankItemRander extends eui.ItemRenderer{
        public imgBg:eui.Image;
        public txtDate:eui.Label;
        public txtSendId:eui.Label;
        public txtRecvId:eui.Label;
        public txtNumber:eui.Label;
        public imgRemark:eui.Image;

        private isLoaded = false

        constructor() {
			super();
			this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
			this.skinName = "resource/custom_skins/bankOperItemSkin.exml";
		}

		private onload():void {
            this.isLoaded = true
            this.updateUI()
		}

        private updateUI():void{
            //{guid, ruid, t, gold, id}
            if(this.data == null || !this.isLoaded)
                return
            this.txtDate.text = this.data.t.toString()
            this.txtSendId.text = this.data.guid.toString()
            this.txtRecvId.text = this.data.ruid.toString()
            this.txtNumber.text = this.data.gold.toString()
        }

		protected dataChanged():void {
            this.updateUI()
		}
    }

    const selectSprite = "bank_tab_png"
    const unSelectSprite = "bank_tab2_png"
    const selectColor = 0xf2941a
    const unSelectColor = 0x775022
    
    export class bank extends gameUI.base {     
        private setGiveNum(num:number):void{
            if(PlayerManager.Instance.Data.Gold >= num){ 
                this.txtGiveNum.text = num.toString() 
            }else{
                alert("金币不够")
            }
        } 
        public onload():void {
            super.onload();
            this.AddClick(this.imgIn, ()=>{
                var num = parseInt(this.txtInNum.text) 
                PlayerManager.Instance.SaveGold(num)
            }, this)
            this.AddClick(this.imgOut, ()=>{
                var num = parseInt(this.txtInNum.text) 
                PlayerManager.Instance.WithdrawGold(num)
            }, this)
            this.AddClick(this.imgGiveOK, ()=>{
                if(this.txtGiveId.text == null || this.txtGiveId.text == "" || this.txtGiveNum.text == null || this.txtGiveNum.text == ""){
                    alert("请填写ID或金额")
                    return
                }
                var id = parseInt(this.txtGiveId.text)
                var num = parseInt(this.txtGiveNum.text)
                PlayerManager.Instance.GiveGold(num, id)
            }, this)
            this.AddClick(this.imgTenW, ()=>{ this.setGiveNum(100000)  }, this)
            this.AddClick(this.imgOneQW, ()=>{ this.setGiveNum(10000000)  }, this)
            this.AddClick(this.imgTenFiveBW, ()=>{ this.setGiveNum(5000000)  }, this)
            this.AddClick(this.imgOneBaiW, ()=>{ this.setGiveNum(1000000)  }, this)
            this.AddClick(this.imgOneYi, ()=>{ this.setGiveNum(100000000)  }, this)            

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
            
            PlayerManager.Instance.addEventListener(constant.event.logic.on_player_data_update, this.updateUI, this)
			this.updateUI(PlayerManager.Instance.Data) 

            MessageManager.Instance.addEventListener(constant.msg.SC_GET_BANK_RECORD , this.onGetBankRecord, this)
            this.getBankRecord(0)
        }
        
        public onUnload():void{
            super.onUnload()
            MessageManager.Instance.removeEventListener(constant.msg.SC_GET_BANK_RECORD , this.onGetBankRecord, this)
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
        private getBankRecord(begin:number):void{
            MessageManager.Instance.SendMessage({
                protocol:constant.msg.CS_GET_BANK_RECORD,
                begin:begin,
            })
        }  
        private onGetBankRecord(data):void{
            if(data.ret == 0){
                this.dataList.dataProvider = new eui.ArrayCollection(data.list) //list []{guid, ruid, t, gold, id}
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