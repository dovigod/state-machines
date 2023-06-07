class FSM{
  #state
  #stateKeys
  constructor(value){
    
    this.key = Symbol('FSM_Key');
    //mutators
    this.transition = {
      LOCK : {
        unlock : function(){
          this.changeFSMState('IDLE')
        }
      },
      IDLE : {
        setState : function(setter){
          const currentState = this.#state[this.#state.length - 1];
          console.log(setter)
          if(typeof setter === 'function'){
            const newState = setter.apply(this, [currentState])
            if(newState === currentState){
              return;
            }
            this.#state.shift();
            this.#state.push(newState)
          }else{
            this.#state.shift();
            this.#state.push(setter)
          }
          this.changeFSMState('LOCK')
        },
        lock : function(){
          this.changeFSMState('LOCK')
        }
      }
    }
    this.dispatcher = function(action , ...payload){
      if(!action) return;
      if(!this.transition[this.FSMState][action]){
        throw new Error('Invalid access:: invalid action request.');
      }
      this.transition[this.FSMState][action].apply(this , payload)
    }
    this.changeFSMState = function(newState){
      this.FSMState = newState
    }
    this.FSMState = 'IDLE';
    // presentation layer
    this.#state = [value]
    this.#stateKeys = [Symbol(Math.random())]
    console.log(this.#state)
  }
  getState(){
    return this.state[0]
  }
}



const t = new FSM('hello')

t.dispatcher('setState' , (currentState) => {
  return 'byee'
})

t.dispatcher('setState' , ['hello'])