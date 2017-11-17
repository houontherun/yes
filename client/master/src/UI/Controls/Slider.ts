// TypeScript file
namespace gameUI{
    export class Slider extends eui.Component{        
        private bg:eui.Image = null;
        private fg:eui.Image = null;
        private thumb:eui.Image = null;

        public bgSrc:string = "sliderbg_png";
        public fgSrc:string = "sliderfg_png";
        public thumbSrc:string = "slider_png";

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
            this.skinName = "resource/custom_skins/controls/sliderSkin.exml";
        }

        protected createChildren() {
            super.createChildren();
        }

        private onLoad():void{
            if(this.thumb != undefined && this.fg != undefined && this.bg != undefined) {
                this.bg.source = this.bgSrc
                this.fg.source = this.fgSrc
                this.thumb.source = this.thumbSrc
                
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
        }
    }
}