import { StateDispatcher } from "./StateDispatcher.js";

export class StateSubscriber{
  constructor(onTransitionAction){
    this.subscribers = [];
    this.onTransitionAction = onTransitionAction
    this.Dispathcer = new StateDispatcher()
  }
  //symbol , hash etc..
  subscribe(state){
    if(state instanceof Array){
      this.subscribers.push(...state)
    }else{
      this.subscribers.push(state);
    }
  }
  notify(){
    this.onTransitionAction()
  }
  
}