import React, { Component } from 'react'
import { SwiperContainer, SwiperSlide } from "@/components/swiperComponent"
export default class Swiperbig extends Component {
    render() {
        const {picytredata,count}=this.props
        return (      
            <SwiperContainer className='imgeswiper'>
            {
                picytredata.List && picytredata.List.map((v, i) => {
                    return <SwiperSlide key={i} options={{
                        pagination:{
                           el: '.swiper-pagination',
                           type: 'fraction',
                           renderFraction:  (currentClass)=> {
                               return `<span class="${currentClass}"></span>/<span>${count}</span>`;
                           },
                      }
                  }}>
                        <img src={v.Url.replace("{0}", "3")} alt="" />
                    </SwiperSlide>
                })
            }             
           </SwiperContainer>
        )
    }
}
