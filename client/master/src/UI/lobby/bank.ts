// TypeScript file

namespace gameUI{
    class rankItemRander extends eui.ItemRenderer{
        public imgBg:eui.Image;
        public txtDate:eui.Label;
        public txtSendId:eui.Label;
        public txtRecvId:eui.Label;
        public txtNumber:eui.Label;
        public imgRemark:eui.Image;
        public lblRemark:eui.Label;

        private isLoaded = false

        constructor() {
			super();
			this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
			this.skinName = "resource/custom_skins/bankOperItemSkin.exml";
		}

		private onload():void {
            this.isLoaded = true
            this.lblRemark.text = Util.uiText('评价')
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
                UIManager.Instance.showNotice(this.text(1102115))
            }
        } 
        public initText(){
            this.txtTitle.text = this.text(1102014)
            this.txtTabGS.text = this.text(1102031)
            this.txtTabGive.text = this.text(1102036)
            this.txtTabRecord.text = this.text(1102045)
            this.lblInOUtNum.text = this.text(1102032)
            this.lblBankPwd.text = this.text(1102033)
            this.txtInNum.prompt = this.text('存入不需要输入密码')
            this.txtGSBankPwd.prompt = this.text('默认密码123456')
            this.lblGiveId.text = this.text(1102037)
            this.txtBankPwd.prompt = this.text('默认密码123456')
            this.lblBankPwd2.text = this.text(1102033)
            this.lblGiveNum.text = this.text(1102038)
            this.lblTenW.text = this.text(1102039)
            this.lblOneQW.text = this.text(1102042)
            this.lblFiveBW.text = this.text(1102041)
            this.lblOneBaiW.text = this.text(1102040)
            this.lblOneYi.text = this.text(1102043)
            this.lblGiveOk.text = this.text(1102044)
            this.lblDate.text = this.text(1102046)
            this.lblGiveNum2.text = this.text(1102014)
            this.lblSendId.text = this.text(1102047)
            this.lblRecvId.text = this.text(1102048)
            this.lblRemke.text = this.text(1102050)
            this.lblIn.text = this.text(1102034)
            this.lblOut.text = this.text(1102035)
            this.lblNoRecords.text = this.text(1102126)
        }
        public onload():void {
            super.onload();
            this.initText()
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
                    UIManager.Instance.showNotice(Util.uiText("请填写ID或金额"))
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
            this.svRecords.initItemRenderer(rankItemRander) //list []{guid, ruid, t, gold, id}
            this.svRecords.initItemSkin("resource/custom_skins/bankOperItemSkin.exml")
            
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
                if(data.list.length > 0){
                    this.svRecords.bindData(data.list) //list []{guid, ruid, t, gold, id}
                    this.lblNoRecords.visible = false
                }
                else{
                    this.lblNoRecords.visible = true
                }
            }
        }

        private currentTabIndex:number = -1
        private tabBtns:Array<eui.Image>
        private tabText:Array<eui.Label>
        private tabGroup:Array<eui.Group>
        
        public txtTitle:eui.Label;
        public txtTabGS:eui.Label;
        public txtTabGive:eui.Label;
        public txtTabRecord:eui.Label;
        public txtCurrent:eui.Label;
        public txtTotel:eui.Label;
        public lblInOUtNum:eui.Label;
        public lblBankPwd:eui.Label;
        public txtInNum:eui.EditableText;
        public txtGSBankPwd:eui.EditableText;
        public txtGiveId:eui.EditableText;
        public txtGiveNum:eui.EditableText;
        public lblGiveId:eui.Label;
        public txtBankPwd:eui.EditableText;
        public lblBankPwd2:eui.Label;
        public lblGiveNum:eui.Label;
        public lblTenW:eui.Label;
        public lblOneQW:eui.Label;
        public lblFiveBW:eui.Label;
        public lblOneBaiW:eui.Label;
        public lblOneYi:eui.Label;
        public lblGiveOk:eui.Label;
        public lblDate:eui.Label;
        public lblGiveNum2:eui.Label;
        public lblRecvId:eui.Label;
        public lblSendId:eui.Label;
        public lblOut:eui.Label;
        public lblIn:eui.Label;

        public lblRemke:eui.Label;

        public svRecords:gameUI.Scrollview;
        public groupRecord:eui.Group;
        public imgGiveOK:eui.Image;
        public imgOneYi:eui.Image;
        public imgOneBaiW:eui.Image;
        public imgTenFiveBW:eui.Image;
        public imgOneQW:eui.Image;
        public imgTenW:eui.Image;
        public groupGive:eui.Group;
        public imgOut:eui.Image;
        public imgIn:eui.Image;
        public groupGS:eui.Group;
        public btnClose:eui.Image;
        public imgTabGS:eui.Image;
        public imgTabGive:eui.Image;
        public imgTabRecord:eui.Image;
        public lblNoRecords:eui.Label;
    }
}