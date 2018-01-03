// TypeScript file

// 注册


namespace gameUI{
    export class loading extends gameUI.base {
        public onload():void {
            super.onload();
        }

        public setProgress(pro:number){
            this.loadingFg.width = pro * 10 // *1000/100
            this.loadingPos.x = this.loadingFg.x + this.loadingFg.width - 3
            this.txtLoading.text = Util.uiText(1102108) + pro + '%'
        }

        public loadingBg:eui.Image;
        public loadingFg:eui.Image;
        public txtLoading:eui.Label;
        public loadingPos:eui.Image;
    }
}