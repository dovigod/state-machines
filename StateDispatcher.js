export class StateDispatcher{
    constructor(onDispatchSuccess){
      this.taskQueue = [];
      this.onDispatch = onDispatchSuccess
      this.fps = 120
      this.frame = 0;
    }
    //symbol , hash etc..
    pushTransition(transition){
        this.taskQueue.push(transition)
    }
    runDispatchScheduler(){
        const debounceFrame = () => {
          this.frame += 1;

          if(this.frame > this.fps){
            this.taskQueue.forEach((task) => task())
            if(this.taskQueue.length > 0){
                this.onDispatch()
                this.taskQueue = []
            }
            this.frame = 0;
          }
          requestAnimationFrame(debounceFrame)
        }

        debounceFrame()
    }
  }