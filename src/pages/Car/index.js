import React, { Component } from 'react'
import api from "@/api/car"
import { Button } from 'antd-mobile';
import {connect} from "react-redux"
import Allcar from "../../components/allcar/index";
class Car extends Component {
    state={
        textdata:[],
        typedata:[],
        indexof:0
    }
    render() {
        const {textdata,typedata,indexof}=this.state 
        const alldata=Object.keys(this.props.detaildata).reverse()  
        // console.log(typedata)    
        return (
            <div className="ouotation_box">
            {/* banner图片 */}
                <div className="bannerlist">
                <img src={textdata.CoverPhoto} onClick={()=>this.clickimg(textdata.SerialID)} alt=""/>
                <span className="img_num">{textdata.pic_group_count}张照片</span>
                </div>
            {/* 报价单 */}
                <div className="oution">
                <div className="price_left">
                <p>{textdata.market_attribute?textdata.market_attribute.dealer_price:""}</p>
                <span>指导价  {textdata.market_attribute?textdata.market_attribute.official_refer_price:""}</span>
                </div>   

                <Button type="primary" className="btn_right" onClick={()=>this.quota(textdata.SerialID)}>{textdata.BottomEntranceTitle}</Button>
                </div>

            {/* 年份报价 */}
            <div className="clicktab">
            {
                alldata.map((v,i)=>{
                    return <span key={i} onClick={()=>this.clicktap(v,i)} className={indexof===i?"active":""}>{v}</span>
                })
            }            
            </div>
            {/* 报价列表 */}
            <div className="price_list">
            
            {
                typedata.map((val,index)=>{
                    return <div className="yera_price" key={val.car_id}>
                    <Allcar val={val}/>
                    <div className="bom" onClick={()=>this.quota(val.car_id)}>
                    询问低价
                    </div>

                    </div>
                })

            }         
            </div>
            {/* 定位询问低价 */}
            <div className="position_price">
            <p>询问低价</p>
            <p>本地经销商为您报价</p>
            </div>
            </div>
        )
    }
      async componentDidMount(){
         // 获取车系详情  
         const SerialID=this.props.match.params.id//获取车系id
         const res=await api.getcarText({SerialID})
         this.props.setdetaildata(res.data.data)

            this.setState({
                textdata:res.data.data,
                typedata:this.props.detaildata["全部"]
            })
    }
    // 点击头部切换相关年份的数据
    clicktap(v,i){
        this.setState({
            typedata:this.props.detaildata[v],
            indexof:i
        })
    }
    // 点击图片进入图片列表详情
    clickimg(SerialID){

        this.props.history.push("/img/"+`${SerialID}`)

    }
    // 点击按钮到报价也没
    quota(id){
        this.props.history.push("/quotation/"+`${id}`)
    }
}
let mapPropState = (state) => {
    return {
        ...state.detail
    }
}
let mapPropsdispath = (dispatch) => {
    return {
        setdetaildata(data) {
            dispatch({
                type: "SET_DETAIL_DATA",
                data: data
            })
        }
    }
}
export default connect(mapPropState,mapPropsdispath)(Car)
