export class StateDispatcher{
    static #instance;
    constructor(onDispatchSuccess){
      if(StateDispatcher.#instance && this.onDispatch){
        return StateDispatcher.#instance
      }
      StateDispatcher.#instance = this
      this.taskQueue = [];
      this.onDispatch = onDispatchSuccess
      this.fps = 120
      this.frame = 0;
      this.notificationState = {}
    }
    //symbol , hash etc..
    pushTransition(transition){
        this.taskQueue.push(transition)
    }
    registerNotificationState(state, handler){
      if(state instanceof Array){
        state.forEach(s => this.notificationState[s] = handler)
      }else{
        this.notificationState[state] = handler
      }
      console.log(this.notificationState)
    }
    runDispatchScheduler(){
        const debounceFrame = () => {
          // this.frame += 1;
          // if(this.frame > this.fps){
            if(this.taskQueue.length > 0){
                const notificationList = []
                this.taskQueue.forEach((task) => {
                  task.action()
                  if(this.notificationState.hasOwnProperty(task.state)){
                    notificationList.push(task.state)
                  }
                })
                notificationList.forEach(notification => notification.notify())
                this.onDispatch()
                this.taskQueue = []
            }
          requestAnimationFrame(debounceFrame)
        }
        debounceFrame()
    }
  }