import React, { Component } from 'react'
import api from "@/api/baojia";
import City from "@/components/City/index";
import { connect } from "react-redux"

import { Modal, Button, WhiteSpace, WingBlank, Toast,List} from 'antd-mobile';
const alert = Modal.alert;
let dealerIds=[]

class Quotation extends Component {
    state = {
        carId: this.props.match.params.id,
        detailtext: this.props.detailtext,
        carData: [],
        AddressList: [],
        alertcity:false,
        allCity:[],
        checkeds:false,
        name:"",
        mobile:"",
        dealerIds:[],
        location:window.localStorage.getItem("cityname")
    }
    render() {
        const { carData, AddressList,alertcity,allCity,mobile,name,dealerIds} = this.state
        console.log(AddressList)
        return (
            <div className="Quotation_box">
                <div className="top">可向多个商家咨询最低价，商家及时回复</div>

                {
                    carData.map((v, i) => {
                        return <dl className="gotext" key={v.car_id}>
                            <dt>
                                <div className="imges">
                                    <img src={v.CoverPhoto} alt="" />
                                </div>
                            </dt>
                            <dd onClick={this.clickSelectpage}>
                                <h3>{v.AliasName}</h3>
                                <h5>{v.market_attribute.year + "款 " + v.car_name}</h5>
                                <i className="iconfont icon-jiantou right_icon"></i>
                            </dd>
                        </dl>
                    })
                }

                <p>个人信息</p>

                <div className="tel_box">
                <List>   
                    <List.Item>
                        姓名 <input type="text" placeholder="输入你的真实中文姓名" value={name} onChange={(e)=>{this.setState({name:e.target.value})}} className="ipt"/>
                    </List.Item>
                    <List.Item>
                    手机 <input type="text" placeholder="输入你的真实手机号码" value={mobile} onChange={(e)=>{this.setState({mobile:e.target.value})}} className="ipt"/>
                    </List.Item>

                    <List.Item onClick={this.clickCity}>
       
                       选择 <span className="ding" >{window.localStorage.getItem("cityname")}<i className="iconfont icon-jiantou right_icon"></i></span>
                    </List.Item>

                    <List.Item>
                        <div>
                            <Button type="primary" onClick={this.showAlert}>询问低价</Button>
                        </div>
                    </List.Item>

                </List>
                </div>
                <p>选择报价经销商</p>
                <div className="address_box">

                  
                    <List> 
                        {
        AddressList.map((item,index)=>{
                                return   <List.Item key={index} >
                                    <input type="checkbox"  checked={item.checkeds} id={item.dealerId} onClick={()=>this.clicheck(item)}/>
                                    <p className="title_name">{item.dealerShortName}</p>
                                    <p className="address_add">{item.address}</p>
                                    <p className="price_num">{item.vendorPrice}万</p>
                                    <p className="city">售{item.saleRange}</p>                    
                                </List.Item>

                            })

                        }   

                </List>
                </div>
                
                   <div className="position_price">
                   <p onClick={this.showAlert}>询问低价</p>
                   </div>
                   <City alertcity={alertcity} onClick={this.clickCity} allCity={allCity}/>                           
            </div>
        )
    }
    async  componentDidMount() {
        this.setdetail()

        // 获取ip定位
    const res=await api.getIPCar()
            const flag=window.localStorage.getItem("cityname")
            // if(flag){
            //      return
            // }else{
            //  window.localStorage.setItem("cityname",res.data.data.CityName)
            // console.log(res.data.data)

            // }
    
        //获取经销商列表 
        const { carId, option } = this.state
        const ress=await api.getDealerlist({ carId, cityId: res.data.data.CityID })
        this.setState({
            AddressList: ress.data.data.list
        })
    }
    // 询问低价成功弹框
    showAlert = async () => {
        const { carId,location,dealerIds,mobile,name,carData} = this.state
        // let carname=carData.market_attribute.year + "款 " + carData.car_name
        
        console.log(carId,location,dealerIds,mobile,name)
       const res=await api.getSubmit({carid:carId,location,dealerIds,mobile,name})
       console.log(res)

         alert('询问成功', '稍后有汽车顾问为您服务，请保持手机畅通', [
          { text: 'OK', onPress: () => console.log('ok') },
        ]);

      }

    // 处理数据
    async  setdetail() {
        const { detailtext, carId } = this.state
        const a = await detailtext.list.filter((item, index) => {
            if (item.car_id == carId) {
                return {
                    ...item
                }
            }
        })
        a[0].CoverPhoto = detailtext.CoverPhoto
        a[0].AliasName = detailtext.AliasName


        this.setState({
            carData: a
        })
    }

    //点击城市
    clickCity=async (id,cityname)=>{
       window.localStorage.setItem("cityname",cityname)     
        this.setState({
            alertcity:!this.state.alertcity,
            location:cityname
        })
        if(!this.state.alertcity){
            const res=await  api.getAllcity()
            this.setState({
                allCity:res.data.data
            })
        }
    }

    // 点击图片选配置
    clickSelectpage=()=>{
        this.props.history.push("/Selectpage")
    }

    // 点击单选
    clicheck=(item)=>{
        let text = document.getElementById(item.dealerId)
         dealerIds.push(text.id)
         this.setState({
            dealerIds:dealerIds
         })
    //   this.showAlert(dealerIds)
        // console.log(dealerIds)
    }
}
let mapPropsstate = (state) => {
    return {
        ...state.detail
    }
}

export default connect(mapPropsstate)(Quotation)
