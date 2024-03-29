// TypeScript file

namespace gameUI{
    export class UIbase extends eui.Component{
        constructor(skin?:any){
            super();

            this.once( eui.UIEvent.COMPLETE, this.onload, this);
            this.skinName = skin;
            
        }
        public onload():void {

        }


        public AddClick(img:eui.UIComponent, onClick:Function, thisObject:any):void{
            var scaX = img.scaleX
            var scaY = img.scaleY
            img.x += img.width/2
            img.y += img.height/2
            // img.anchorOffsetX = img.width/2
            // img.anchorOffsetY = img.height/2            

            img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{
                img.scaleX = scaX * 0.8
                img.scaleY = scaY * 0.8
            }, thisObject)
            img.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                img.scaleX = scaX
                img.scaleY = scaY
                 onClick();
            }, thisObject)
        }

         public SetImageUrl(img:eui.Image,url:string):void {
            var texture :egret.Texture = RES.getRes(url);
             if(texture)
             {
		         img.width = texture.textureWidth;
		         img.height = texture.textureWidth;
	             img.texture = texture;
             }

        }

    }
}
