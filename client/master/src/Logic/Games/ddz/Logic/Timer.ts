	/**
	 * 时间定时器
	 * @author  yanwei47@163.com
	 *
	 */

module CardLogic {
   interface IHandler
   {
       (Handler:any):void;
   }

	class TimerInfo 
	{
	   private stop:boolean = false;
	   private remove:boolean = false;
       private locked:boolean = false;

	   private seconds:number;
	   private num : number;
	   private func: (any) => void;
       private tick :number = 0; 
	   private args:any = null;
       
	   public get Locked():boolean
	   {
		   return this.locked;
	   }

	   public get Remove():boolean
	   {
		   return this.remove;
	   }

	    public set Locked(value:boolean)
	   {
		   this.locked = value;
	   }

	   public set Remove(value:boolean)
	   {
		  this.remove = value;
	   }


	   public recycle()
	   {
		   this.args = null;
		   this.func = null;
	   }

	   public constructor(seconds:number, func:IHandler, num:number,args?:any)
	   {
           this.func = func;
           this.seconds = seconds;
		   this.num = num;
		   this.args = args;
	   }

	   public Tick(t:number)
	   {
           if(this.stop||this.locked){return;}
           this.tick = this.tick + t
		   if(this.tick >= this.seconds)
		   {
			   this.tick = 0;
			   this.locked = true
			   if(this.func !=null)
			   {
				 this.func(this.args);			     
			   }
			   this.locked = false
			    if(this.num > 0)
			     {
					 this.num = this.num - 1;
					 if(this.num <= 0)
					 {
						this.remove = true
					    this.stop = true
					 }
				 }
		   }

	   }
	}


 export	class Timer {

    private static instance: Timer;
	public tick: () => void;
    private timers:Array<TimerInfo> = [];


   public static get Instance() {
        if(Timer.instance == null) {
            Timer.instance = new Timer();
        }
        return Timer.instance;
    }

	public constructor()
	 {
         this.tick = ()=>{
            for(let timer of this.timers)
			{
               if(timer.Remove ||timer.Locked)
			   {
				   var index = this.timers.indexOf(timer);
				   if (index > -1)  this.timers.splice(index,1);
				   timer.recycle();
				   timer = null;
			   }
			   else
			   {
				   timer.Tick(0.1);
			   }
			}
        }
	 }
   
    public Delay(sec:number, func:IHandler,args?:any):TimerInfo
	{
		let timer = new TimerInfo(sec,func,1,args);
		this.timers.push(timer);
		return timer;
	}

	public Repeat(sec:number, func:IHandler,args?:any):TimerInfo
	{
		let timer = new TimerInfo(sec,func,0,args);
		this.timers.push(timer);
		return timer;
	}

	public Numberal(sec:number, func:IHandler,num:number,args?:any):TimerInfo
	{
		let timer = new TimerInfo(sec,func,num,args);
		this.timers.push(timer);
		return timer;
	}

	public Remove (timerinfo:TimerInfo)
	{
		if(timerinfo)
		{
			timerinfo.Remove = true;
		}
	}

	
	
 }
}