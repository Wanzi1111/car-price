import React, { Component } from 'react'

export default class AlertColor extends Component {
    state={
        indexof:0,
        typedata:[]
    }
    render() {
        const {indexof,typedata}=this.state
        const {alertcolor,clickallColor,allColor}=this.props
        const newdata=Object.keys(allColor)

        return (
            <div className={alertcolor?"alertColor":"onalertColor"}>
            <div className="headcolor"  onClick={clickallColor}>全部颜色</div>
            {/* 年份颜色 */}
            <div className="clicktab">
            {
                newdata.map((v,i)=>{
                    return <span key={i} onClick={()=>this.clicktap(v,i)} className={indexof===i?"active":""}>{v}</span>
                })
            }
            </div>

            <div className="bigColor">
            {
                typedata&&typedata.map((val,index)=>{
                    return <div key={val.ColorId}  className="small_box">
                    <span className="color" style={{"background":val.Value}}></span>  
                    <span className="text">{val.Name}</span>

                    </div>


                })
            }
            
            </div>
                
            </div>
        )
    }
            // 点击头部切换相关年份的数据
            clicktap(v,i){
                this.setState({
                    typedata:this.props.allColor[v],
                    indexof:i
                })
            }
}
