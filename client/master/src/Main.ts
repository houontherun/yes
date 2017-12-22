//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    protected createChildren(): void {
        super.createChildren();
        // var scaleX = egret.Capabilities.boundingClientWidth/this.stage.stageWidth
        // var scaleY = egret.Capabilities.boundingClientHeight/this.stage.stageHeight
        
        // if(scaleX > 1 && scaleY > 1){
        //     var scale = scaleX < scaleY ? scaleX : scaleY
        //     this.scaleX = this.scaleY = scale
        // }
        this.scaleX = this.scaleY = 1.438
        
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
           // egret.ticker.resume();
        }

        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        // 添加logo
        var loader:egret.ImageLoader = new egret.ImageLoader();
        loader.addEventListener(egret.Event.COMPLETE, (event)=>{
            var loader:egret.ImageLoader = <egret.ImageLoader>event.target;
            var bitmapData:egret.BitmapData = loader.data;
            var texture = new egret.Texture();
            texture.bitmapData = bitmapData;
            var bit = new egret.Bitmap(texture)
            bit.alpha = 0;
            this.addChild(bit);
            var tween = egret.Tween.get(bit)
            tween.to({alpha:1}, 1000)
        }, this);
        var url:string = "resource/assets/logo.jpg";
        loader.load(url);

        var timer = new egret.Timer(1500, 1)
        timer.addEventListener(egret.TimerEvent.TIMER, ()=>{
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig("resource/default.res.json", "resource/");
        }, this);
        timer.start()  

    }

    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

        ResourceManager.Instance.Init()
        UIManager.Instance.Init(this);
        GameManager.Instance.Init()   

        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        ResourceManager.Instance.loadGroups(["login", "data"], this, this.onResourceLoaded)
    }

    private isResourceLoadEnd: boolean = false;
    private onResourceLoaded(){
        this.isResourceLoadEnd = true
        this.createScene()
    }

    private isThemeLoadEnd: boolean = false;
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    
    private createScene() {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            UIManager.Instance.LoadUI(UI.login)
        }
    }
}
