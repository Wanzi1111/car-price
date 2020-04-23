import React, { Component } from 'react'
import {connect} from "react-redux"
import Allcar from "@/components/allcar/index"
class Selectcity extends Component {
    state={
        indexof:0
    }
    render() {
        const alldata=Object.keys(this.props.detaildata).reverse()

        const {indexof}=this.state
        const {alertflag,clickallCar}=this.props
        return (
            <div className="box">
            <div className={alertflag?"alertCar":"onalertcar"} >

            {/* 年份报价 */}
             <div className="clicktab">
             <span onClick={this.callback}>{"<"}</span>

            {
                alldata.map((v,i)=>{
                    return <span key={i} onClick={()=>this.clicktap(v,i)} className={indexof===i?"active":""}>{v}</span>
                })
            }

            {/* 报价列表 */}
                    <div className="car_ist">          
            {              
                this.props.detaildata["全部"].map((val,index)=>{
                    return <div className="yera_price" key={val.car_id}>
                    <Allcar val={val}/>

                    </div>
                })
            }         
            </div>
            </div>
                
            </div>
            </div>
        )
    }
        // 点击头部切换相关年份的数据
        clicktap(v,i){
            this.setState({
                typedata:this.props.detaildata[v],
                indexof:i
            })
        }
        // 点击退回
        callback=()=>{
        this.props.history.goBack()

        }
}

let mapPropState = (state) => {
    return {
        ...state.detail
    }
}

export default connect(mapPropState)(Selectcity)
