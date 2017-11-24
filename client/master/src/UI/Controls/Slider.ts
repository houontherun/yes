// TypeScript file
module gameUIControl {
    export class Slider extends eui.Component{    

        private _value:number = 0

        public get value():number{
            if(this._value < 0)
                this._value = 0
            if(this._value > 1)
                this._value = 1
            return this._value
        }

        constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.onLoad, this);
            // this.skinName = "resource/custom_skins/controls/SliderSkin.exml";
            // this.skinName = "gameUIControl.SliderSkin"
        }

        protected createChildren() {
            super.createChildren();
        }

        private onLoad():void{
            this.bg.addEventListener(egret.TouchEvent.TOUCH_MOVE, (event)=>{
                if(event.touchDown){
                    if(event.localX > 0 && event.localX < this.bg.width){
                        this.thumb.x = event.localX
                        this.fg.width = event.localX
                        this._value = event.localX/this.fg.width
                    }                        
                }
            }, this)
        }
        public bg:eui.Image;
        public fg:eui.Image;
        public thumb:eui.Image;
    }
}