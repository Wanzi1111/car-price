import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk";
const getReduce=()=>{
    const files = require.context('./reduces',true,/\.js$/);
    return files.keys().reduce((prev,item)=>{
        const reducers = files(item).default;
        const key = item.match(/\.\/(\w+)\.js/)[1];
        prev[key] = reducers;
        return prev;
    },{})
}
const reducers=combineReducers(getReduce())

export default createStore(reducers,applyMiddleware(thunk))
