// TypeScript file

namespace gameUI{
    export class base extends eui.Component{
        constructor(uidata:any, data?:any){
            super();
            
            this.uidata = uidata;
            this.data = data;
            this.name = uidata.name;

            this.addEventListener( eui.UIEvent.COMPLETE, this.onload, this);
            this.skinName = uidata.skin;
        }
        public onload():void {
            console.log("load ui:" + this.uidata.name)
        }
        public onUnload():void{
            console.log("unload ui:" + this.uidata.name)
        }

        public Close():void{
            UIManager.Instance.UnloadUI(this.uidata);
        }

        public AddClick(img:eui.Image, onClick:Function, thisObject:any):void{
            var scaX = img.scaleX
            var scaY = img.scaleY
            img.x += img.width/2
            img.y += img.height/2
            img.anchorOffsetX = img.width/2
            img.anchorOffsetY = img.height/2            

            img.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{
                img.scaleX = scaX * 0.8
                img.scaleY = scaY * 0.8
            }, thisObject)
            img.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
                img.scaleX = scaX
                img.scaleY = scaY
                onClick()
            }, thisObject)
        }

        public get UIData():any{
            return this.uidata;
        }
        public get Data():any{
            return this.data;
        }

        private uidata:any;
        private data:any;
    }
}
