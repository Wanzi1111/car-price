import React, { Component } from 'react'

export default class Allcar extends Component {
    render() { 
        const {val}=this.props
        return (
                <div className="top">
                    <p className="type_list">{val.exhaust_str+"/"+val.max_power_str+"/"+val.inhale_type}</p>
                    <h5>{val.market_attribute.year+"款  "+val.car_name}</h5>
                    <p className="horse_type">{val.horse_power+"马力  "+val.gear_num+"档  "+val.trans_type}</p>
                    <p className="cls_price">指导价:<b>{val.market_attribute.dealer_price=="暂无报价"?val.market_attribute.dealer_price:val.market_attribute.dealer_price}</b></p>
                </div>
       
        )
    }
}
