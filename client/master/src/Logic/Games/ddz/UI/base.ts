// TypeScript file

namespace gameUI{
    export class UIbase extends eui.Component{
        constructor(skin?:any){
            super();
            this.skinName = skin;
            
        }

        public AddClick(img:eui.UIComponent, onClick:Function, thisObject:any):void{
           // var scaX = img.scaleX
           // var scaY = img.scaleY

            img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{
               // img.scaleX = scaX * 0.8
                //img.scaleY = scaY * 0.8
            }, thisObject)
            img.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                //img.scaleX = scaX
                //img.scaleY = scaY
                 onClick();
            }, thisObject)
        }

         public SetImageUrl(img:eui.Image,url:string):void {
            var texture :egret.Texture = RES.getRes(url);
             if(texture)
             {
		         img.width = texture.textureWidth;
		         img.height = texture.textureHeight;
	             img.texture = texture;
             }

        }

    }
}
