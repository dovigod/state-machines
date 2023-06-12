import { StateDispatcher } from './StateDispatcher.js'
import { useEffect } from './useEffect.js';
const states = [];
let renderCnt = 1;
let stateKey = 0;

function useState(initialVal){
  const key = stateKey;
  if (states.length === key) {
    states.push(initialVal);
  }
  const state = states[key];
  const setState = (setter) => {
    let newState = null
    if(typeof setter === 'function'){
      newState = setter.apply({}, [states[key]])
      if(states[key] === newState) return;
      states[key] = newState;
    }else{
      if(states[key] === setter) return
      newState = setter
    }
    dispatcher.pushTransition({
      state : states[key],
      action : () => {states[key] = newState}
    })
  }

  stateKey += 1;

  return [ state, setState ];
}

function MyComponent(){
  const [state , setState] = useState(0);
  function updateState(){
    setState((cur) => cur + 1)
  }
  window.updateState = updateState
  return `
    <button onclick="updateState()"> increate State </button>
    <span> ${state} :: is my state</span>
  `
}
function MySecond(){
  const [state , setState] = useState(0);
  function updateState2(){
    setState(cur => cur + 1)
  }
  useEffect(() => {
    console.log('use Effect working!!')
  },['a'])
  window.updateState2 = updateState2
  return `
    <button onclick="updateState2()"> increate State2 </button>
    <span> ${state} :: is my state2</span>
  `
}

function Multiple(){
  const [s1 , ss1] = useState(0)
  const [s2 , ss2] = useState(0)
  function update(){
    ss1(c => c+1);
    ss2(c => c+1);
  }

  window.db = () => update()
  return `
    <div>
      <button onclick="db()"> multiple state update!</button>
      <div>s1:: ${s1}</div>
      <div>s2:: ${s2}</div>
    </div>
  `
}
function render(){
  console.log(renderCnt + ' rendered.')

  document.body.innerHTML = `
    <div>
      ${MyComponent()}
      ${MySecond()}
      ${Multiple()}
    </div>
  `
  renderCnt++;
  stateKey = 0;
}

const dispatcher = new StateDispatcher(render)
console.log(dispatcher)
dispatcher.runDispatchScheduler()
render()