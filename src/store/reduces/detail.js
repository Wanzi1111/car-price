const data={
    detaildata:[],
    detailtext:{}
}
const actions={
    SET_DETAIL_DATA(state,{data}){
        state.detailtext=data
        state.detaildata=data.list.reduce((prev,item)=>{
        const key=item.market_attribute.year
        const all={"全部":data.list}
        prev[key]=data.list.filter((item)=>item.market_attribute.year==key)
            return {
                ...all,
                ...prev
            }
        },{})
    }

}
export default function reducer(state=data,action){
    let newdata=JSON.parse(JSON.stringify(state));
    actions[action.type]&&actions[action.type](newdata,action)
    return newdata
}