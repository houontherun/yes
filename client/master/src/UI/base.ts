// TypeScript file

namespace gameUI{
    export class base extends eui.Component{
        constructor(uidata:any, data?:any){
            super();
            
            this.uidata = uidata;
            this.data = data;

            this.once( eui.UIEvent.COMPLETE, this.onload, this);
            this.skinName = uidata.skin;
        }
        public onload():void {

        }

        public Close():void{
            UIManager.Instance.UnloadUI(this.uidata);
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
