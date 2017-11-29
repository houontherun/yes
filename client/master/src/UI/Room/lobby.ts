// 游戏大厅主UI
namespace gameUI{

	class game_item extends eui.ItemRenderer{
		constructor() {
			super();
			this.skinName = "resource/custom_skins/game_itemSkin.exml";
			this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
		}

		private onload():void {
			this.updateUI();
			this.imgBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}

		private onClick():void {
			if(this.data.ID == 101){ // 斗地主
				UIManager.Instance.LoadUI(UI.ddzSelectRoom)
			}else{
				alert("暂未开放功能")
			}
		}

		private updateUI():void{
			if(this.imgBg == null || this.imgBg == undefined)
				return
			this.txtName.text = this.data.Name1
		}

		protected dataChanged():void {
			this.updateUI();
		}

		private imgBg:eui.Image;
		public txtName:eui.Label;
	}

	export class lobby extends gameUI.base{
		public onload():void {
			super.onload()

			var jsonData = RES.getRes('hall_json')
			var games = {
				1:[],
				2:[],
				3:[]
			}
			for(var id in jsonData.Game){
				var game = jsonData.Game[id]
				games[game.type].push(game)
			}

			this.svGame.horizontalScrollBar	= null;
			this.listGames.itemRenderer = game_item;
			this.listGames.dataProvider = new eui.ArrayCollection(games[1]);

			this.AddClick(this.btnPuke, ()=>{
				this.listGames.dataProvider = new eui.ArrayCollection(games[1]);
				this.listGames.validateNow();
			}, this)

			this.AddClick(this.btnMajiang, ()=>{
				this.listGames.dataProvider = new eui.ArrayCollection(games[2]);
				this.listGames.validateNow();                
            }, this );
			this.AddClick(this.btnQilei, ()=>{
				this.listGames.dataProvider = new eui.ArrayCollection(games[3]);
				this.listGames.validateNow();                
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
				// this.imgShop.source = "logout_png" 
            }, this );
			this.AddClick(this.imgSetting, ()=>{    
				UIManager.Instance.LoadUI(UI.setting)       
            }, this );
            this.AddClick(this.btnEnter, ()=>{
                UIManager.Instance.LoadUI(UI.enter_room)				
            }, this );

			// 个人信息
			this.imgHeadIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                
            }, this)
			this.AddClick(this.imgCoypBg, ()=>{
			}, this)

			// this.svGame.addEventListener(egret.Event.CHANGE, (event:Event)=>{
			// 	var offsetX = this.listGames.scrollRect.x //最左边是0
			// 	// console.log(this.listGames.numElements)
			// 	// this.updateChildSize(offsetX)
			// }, this)

			PlayerManager.Instance.addEventListener(constant.event.logic.on_player_data_update, this.updatePlayerInfo, this)
			this.updatePlayerInfo(PlayerManager.Instance.Data)
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

		public imgBg:eui.Image;
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

		
		private svGame:eui.Scroller;
		private listGames:eui.List;


		public btnPuke:eui.Image;
		public btnMajiang:eui.Image;
		public btnQilei:eui.Image;

		public imgMore:eui.Image;
		public imgNotice:eui.Image;
		public imgActivity:eui.Image;
		public imgHelp:eui.Image;

		public imgBank:eui.Image;
		public imgSetting:eui.Image;
		public imgRank:eui.Image;
		public imgCommunity:eui.Image;
		public imgShare:eui.Image;
		public imgShop:eui.Image;
		public btnEnter:eui.Image;

		public groupType:eui.Group;
		public groupMessage:eui.Group;
		public groupTopMenu:eui.Group;
		public groupBottomMenu:eui.Group;
		public groupUserinfo:eui.Group;

	}
}
