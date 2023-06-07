const machine = {
  state: 'INIT',
  data : null,
  worklets : null,
  transitions: { // list of potential states which object can have.
    INIT: {
      initializing: function(param){
        console.log('initializing with param:: ', param)
        this.worklets = param;
        this.changeState('PENDING');
      }
    },
    PENDING : {
      reject : function(error){
        this.changeState('FAILED')
      },
      resolve: function(data){
        this.changeState('FULFILLED')
        this.data = data
      }
    },
    FAILED : {
      await : function(){
        console.log('resolving failed... re-initailize')
        this.changeState('INIT');
        return new Error('promise rejected.')
      }
    },
    FULFILLED : {
      await : function(){
        console.log('resolving fulfilled... re-initailize')
        this.changeState('INIT');
        return this.data
      }
    }
  },
  dispatch(actionName, ...payload){ //call whenever u want to carry out some action.
    const actions = this.transitions[this.state];
    const action = actions[actionName];

    if(action){
      return action.apply(machine, ...payload)
    }else{
      throw new Error('not valid action for current state.')
    }

  },
  changeState(newState){
    this.state = newState
  }
}

const reusablePromise = Object.create(machine , {
  data: {
    writable: false,
    enumerable: true,
    value : ''
  }
})

reusablePromise.dispatch("initializing" , [{ isDataValid : true}]);

console.log(reusablePromise.state)

reusablePromise.dispatch("resolve" , ['hello from resolved data']);

console.log(reusablePromise.state)

const data = reusablePromise.dispatch("await");

console.log(reusablePromise.state)
console.log('data:: ', data);