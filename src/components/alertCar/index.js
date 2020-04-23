import React, { Component } from 'react'
import {connect} from "react-redux"
import Allcar from "../allcar/index"
class alertCar extends Component {
    state={
        indexof:0
    }
    render() {
        const alldata=Object.keys(this.props.detaildata).reverse()

        const {indexof}=this.state
        const {alertflag,clickallCar}=this.props
        return (
            <div className={alertflag?"alertCar":"onalertcar"} >
            <div className="headt" onClick={clickallCar}>全部车款</div>
            {/* 年份报价 */}
             <div className="clicktab">
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
        )
    }
        // 点击头部切换相关年份的数据
        clicktap(v,i){
            this.setState({
                typedata:this.props.detaildata[v],
                indexof:i
            })
        }
}

let mapPropState = (state) => {
    return {
        ...state.detail
    }
}

export default connect(mapPropState)(alertCar)
