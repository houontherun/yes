// TypeScript file



namespace gameUI{
    export class wait extends gameUI.base {
        public onload():void {
            super.onload();

            // this.imgWait.anchorOffsetX = this.imgWait.width/2
            // this.imgWait.anchorOffsetY = this.imgWait.height/2
            var tween = egret.Tween.get(this.imgWait, {loop:true})
            tween.to({rotation:360}, 1000)
        }

        public imgWait:eui.Image;
    }
}