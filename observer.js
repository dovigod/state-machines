class StateSubscriber{
  constructor(){
    this.subscribers = [];
  }
  //symbol , hash etc..
  subscribe(item){
    this.subscribers.push(item);
    this.subscriberAction[item] = 
  }
  unsubscribe(item){
    if(!this.subscribers) return null;
    else{
      this.subscribers.filter(subscriber => subscriber !== item);
    }
  }
  notify(data){
    this.subscribers.forEach(subscriber => subscriber(data))
  }
}