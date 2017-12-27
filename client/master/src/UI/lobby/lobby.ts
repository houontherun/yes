// 游戏大厅主UI
namespace gameUI{

	class game_item extends eui.ItemRenderer{
		constructor() {
			super();
			this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
			this.skinName = "resource/custom_skins/game_itemSkin.exml";
		}

		private onload():void {
			this.isLoaded = true
			this.imgBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.updateUI();
		}

		private onClick():void {
			if(this.data.ID == 101){ // 斗地主
				UIManager.Instance.LoadUI(UI.ddzSelectRoom)
			}else{
				UIManager.Instance.showNotice("暂未开放功能")
			}
		}

		private updateUI():void{
			if(this.data == null || !this.isLoaded)
				return
			this.txtName.text = this.data.Name1
		}

		protected dataChanged():void {
			this.updateUI();
		}

		private isLoaded = false
		private imgBg:eui.Image;
		public txtName:eui.Label;
	}

	export class lobby extends gameUI.base{
		private initText(){
			this.lblBank.text = this.text(1102014)
			this.lblRank.text = this.text(1102015)
			this.lblCom.text = this.text(1102016)
			this.lblShare.text = this.text(1102017)
			this.lblShop.text = this.text(1102018)
			this.lblSetting.text = this.text(1102019)
			this.txtCopyId.text = this.text(1102002)
			this.lblHelp.text = this.text(1102003)
			this.lblActivity.text = this.text(1102004)
			this.lblNotify.text = this.text(1102005)
			this.lblMore.text = this.text(1102006)

			this.lblPoke.text = this.text(1102007)
			this.lblMajiang.text = this.text(1102008)
			this.lblQilei.text = this.text(1102010)
		}
		public onload():void {
			super.onload()
			this.initText()

			var games = DataManager.Instance.getGames()

			this.svGame.initScrollLayout(gameUI.ScrollLayout.Horizontal) 
			this.svGame.initItemRenderer(game_item)
			this.svGame.bindData(games[1])

			this.AddClick(this.btnPuke, ()=>{
				this.svGame.bindData(games[1])
			}, this)

			this.AddClick(this.btnMajiang, ()=>{
				this.svGame.bindData(games[2])          
            }, this );
			this.AddClick(this.btnQilei, ()=>{
				this.svGame.bindData(games[3])           
            }, this );

			// top menu
			this.AddClick(this.imgMore, ()=>{      
            }, this );
			this.AddClick(this.imgNotice, ()=>{ 
            }, this );
			this.AddClick(this.imgActivity, ()=>{         
            }, this );
			this.AddClick(this.imgHelp, ()=>{            
            }, this );

			// bottom menu
			this.AddClick(this.imgBank, ()=>{       
				UIManager.Instance.LoadUI(UI.bank)     
            }, this );
			this.AddClick(this.imgRank, ()=>{     
				UIManager.Instance.LoadUI(UI.rank)
            }, this );
			this.AddClick(this.imgCommunity, ()=>{            
            }, this );
			this.AddClick(this.imgShare, ()=>{           
            }, this );
			this.AddClick(this.imgShop, ()=>{           
				UIManager.Instance.LoadUI(UI.shop)
            }, this );
			this.AddClick(this.imgSetting, ()=>{    
				UIManager.Instance.LoadUI(UI.setting)       
            }, this );
            this.AddClick(this.btnEnter, ()=>{    
                UIManager.Instance.LoadUI(UI.enter_room)				
            }, this );

			this.imgGoldAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                UIManager.Instance.LoadUI(UI.shop, 'charge')
            }, this)
			this.imgAddFb.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                UIManager.Instance.LoadUI(UI.shop, 'shop')
            }, this)

			// 个人信息
			this.imgHeadIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                UIManager.Instance.LoadUI(UI.playerInfo)
            }, this)
			this.AddClick(this.imgCoypBg, ()=>{
			}, this)

			this.imgMsgBg.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                UIManager.Instance.LoadUI(UI.chat)
            }, this)

			// this.svGame.addEventListener(egret.Event.CHANGE, (event:Event)=>{
			// 	var offsetX = this.listGames.scrollRect.x //最左边是0
			// 	// console.log(this.listGames.numElements)
			// 	// this.updateChildSize(offsetX)
			// }, this)

			PlayerManager.Instance.addEventListener(constant.event.logic.on_player_data_update, this.updatePlayerInfo, this)
			this.updatePlayerInfo(PlayerManager.Instance.Data)
			this.imgBg.source = this.defaultBackground
		}
		
        public onUnload():void{
            super.onUnload()
			PlayerManager.Instance.removeEventListener(constant.event.logic.on_player_data_update, this.updatePlayerInfo, this)
        }

		private updatePlayerInfo(data):void{
			this.txtUsrId.text = "ID:" + data.UserId.toString()
			this.txtGoldNum.text = data.Gold.toString()
			this.txtFbNum.text = data.Cardnum.toString()
			this.txtUserName.text = data.Name.toString()
		}
		// private updateChildSize(offsetX:number):void{
		// 	var itemWid = 277
		// 	var itemHei = 355
		// 	var centerX = 277 + offsetX
		// 	for(var i = 0; i < this.listGames.numElements; i++){
		// 		// var i = 3
		// 		var element = this.listGames.getElementAt(i)
		// 		if(element != undefined){
		// 			var x = i * itemWid
		// 			var ox = Math.abs(x - centerX)
		// 			if(ox > 150){ //ox=0的时候正中
		// 				ox = 150
		// 			}
		// 			var scale = 1.5/((ox/300) + 1)
		// 			// console.log(scale)
		// 			// element.height = itemHei * scale
		// 			element.width = itemWid * scale
		// 		}
		// 	}
		// }
		public defaultBackground = "background_png"

		public groupBottomMenu:eui.Group;
		public imgBank:eui.Image;
		public imgSetting:eui.Image;
		public btnEnter:eui.Image;
		public imgRank:eui.Image;
		public imgCommunity:eui.Image;
		public imgShare:eui.Image;
		public imgShop:eui.Image;
		public lblBank:eui.Label;
		public lblRank:eui.Label;
		public lblCom:eui.Label;
		public lblShare:eui.Label;
		public lblShop:eui.Label;
		public lblSetting:eui.Label;
		public imgBg:eui.Image;
		public groupUserinfo:eui.Group;
		public imgFbBg:eui.Image;
		public imgFbIcon:eui.Image;
		public imgAddFb:eui.Image;
		public imgGoldBg:eui.Image;
		public imgGold:eui.Image;
		public imgGoldAdd:eui.Image;
		public imgNameBg:eui.Image;
		public imgHeadbg:eui.Image;
		public imgHeadIcon:eui.Image;
		public txtGoldNum:eui.Label;
		public txtFbNum:eui.Label;
		public imgCoypBg:eui.Image;
		public txtUserName:eui.Label;
		public txtCopyId:eui.Label;
		public txtUsrId:eui.Label;
		public groupTopMenu:eui.Group;
		public imgMore:eui.Image;
		public imgNotice:eui.Image;
		public imgActivity:eui.Image;
		public imgHelp:eui.Image;
		public lblHelp:eui.Label;
		public lblActivity:eui.Label;
		public lblNotify:eui.Label;
		public lblMore:eui.Label;
		public groupMessage:eui.Group;
		public imgMsgBg:eui.Image;
		public txtNotify:eui.Label;
		public groupType:eui.Group;
		public btnPuke:eui.Image;
		public btnMajiang:eui.Image;
		public btnQilei:eui.Image;
		public svGame:gameUI.Scrollview;
		public lblPoke:eui.Label;
		public lblMajiang:eui.Label;
		public lblQilei:eui.Label;

	}
}
