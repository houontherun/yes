// 游戏大厅主UI

namespace gameUI{

	export class lobby extends gameUI.base{

		public onload():void {
			this.svGame.horizontalScrollBar	= null;
			this.listGames.itemRenderer = gameUI.game_item;
			this.listGames.dataProvider = new eui.ArrayCollection(this.Data[0].childs);

			this.AddClick(this.btnPuke, ()=>{
				this.listGames.dataProvider = new eui.ArrayCollection(this.Data[0].childs);
				this.listGames.validateNow();
			}, this)

			this.AddClick(this.btnMajiang, ()=>{
				this.listGames.dataProvider = new eui.ArrayCollection(this.Data[1].childs);
				this.listGames.validateNow();                
            }, this );
			this.AddClick(this.btnQilei, ()=>{
				this.listGames.dataProvider = new eui.ArrayCollection(this.Data[2].childs);
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
            }, this );
			this.AddClick(this.imgRank, ()=>{           
            }, this );
			this.AddClick(this.imgCommunity, ()=>{            
            }, this );
			this.AddClick(this.imgShare, ()=>{           
            }, this );
			this.AddClick(this.imgShop, ()=>{            
            }, this );
			this.AddClick(this.imgSetting, ()=>{           
            }, this );
            this.AddClick(this.btnEnter, ()=>{
                // UIManager.Instance.LoadUI(UI.enter_room)
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

		public imgHeadIcon:eui.Image;
		public imgCoypBg:eui.Image;


	}
}
