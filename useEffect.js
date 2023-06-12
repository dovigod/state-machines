import { StateDispatcher } from "./StateDispatcher.js";
import { StateSubscriber } from "./StateSubscriber.js";

const dispatcher = new StateDispatcher();


export function useEffect(fn , dep){
    const handler = new StateSubscriber(fn);
    handler.subscribe(dep)    

    dispatcher.registerNotificationState(dep, handler);
}



