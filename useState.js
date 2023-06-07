const states = [];
let renderCnt = 1;
let currentStateKey = 0;

function useState(initialVal){
  const key = currentStateKey;
  if (states.length === key) {
    states.push(initialVal);
  }
  const state = states[key];
  const setState = (setter) => {
    if(typeof setter === 'function'){
      const newState = setter.apply({}, [states[key]])
      if(states[key] === newState) return;
      states[key] = newState;
    }else{
      if(states[key] === setter) return
      states[key] = setter
    }

    render();
  }

  currentStateKey += 1;

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
  window.updateState2 = updateState2
  return `
    <button onclick="updateState2()"> increate State2 </button>
    <span> ${state} :: is my state2</span>
  `
}


function debouncer(cb){
  let nextFrameCallback = -1;
  console.log(1)
  return () => {
    cancelAnimationFrame(nextFrameCallback);
    nextFrameCallback = requestAnimationFrame(cb)
  }
}

function render(){
  console.log(renderCnt + ' rendered.')

  document.body.innerHTML = `
    <div>
      ${MyComponent()}
      ${MySecond()}
    </div>
  `
  renderCnt++;
  currentStateKey = 0;
}

debouncer(render)