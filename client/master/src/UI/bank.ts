// TypeScript file


namespace gameUI{
    export class bank extends gameUI.base {
        public onload():void {
            super.onload();
            this.AddClick(this.btnClose, ()=>{
                this.Close()
            }, this)
        }
        
        public btnClose:eui.Image;

    }
}