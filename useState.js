let states = [];
let renderCnt = 1;
let stateKey = 0;

function useState(initialVal){
  const key = stateKey;
  if (states.length === key) {
    states.push(initialVal);
  }
  const state = states[key];
  function setState(setter){
    if(typeof setter === 'function'){
      const newState = setter.apply({}, [states[key]])
      states[key] = newState;
    }else{
      states[key] = setter
    }
    render();
  }

  stateKey += 1;

  return [ state, setState ];
}


function MyComponent(){
  const [state , setState] = useState(0);
  function updateState(){
    setState(state+1)
  }
  window.updateState = updateState
  return `
    <button onclick="updateState()"> increate State </button>
    <span> ${state} :: is my state</span>
  `
}
function MySecond(){
  const [state , setState] = useState(0);
  function updateState(){
    setState(state+1)
  }
  window.updateState = updateState
  return `
    <button onclick="updateState()"> increate State2 </button>
    <span> ${state} :: is my state2</span>
  `
}
function render(){
  renderCnt++;
  console.log(renderCnt + ' rendered.')

  document.body.innerHTML = `
    <div>
      ${MyComponent()}
      ${MySecond()}
    </div>
  `
  stateKey = 0;
}

render()