const data={
    branList:[]
}
const actions={
    GET_BAND_LIST(state,{data}){
        // state.branList=data
      const keys=[...new Set(data.map(item=>item.Spelling.substr(0,1)))]
      state.branList=keys.reduce((prev,item)=>{
          prev[item]=data.filter(val=>val.Spelling.substr(0,1)===item);
          return prev;
      },{})
      console.log(state.branList)
      
    }

}
export default function reducer(state=data,action){
    // console.log(action.type)
    let newdata=JSON.parse(JSON.stringify(state));
    actions[action.type]&&actions[action.type](newdata,action)
    return newdata
}