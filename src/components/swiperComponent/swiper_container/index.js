import React, { Component } from 'react'
import "swiper/src/swiper.scss"
import Swiper from "swiper"
class swipercontainer extends Component {
    render() {
        return (
            <div className={`swiper-container ${this.props.className}`} ref="swiper">
                <div className="swiper-wrapper">
                {this.props.children}
                </div>
                {/* <div class="swiper-pagination pagination"></div> */}
                </div>
        )
    }
    componentDidMount(){
        this.mySwiper=new Swiper(this.refs.swiper,{
            observer:true,
            observeParents:true,
                // 如果需要分页器
        //    pagination: {
        //     type:"fraction",
        //     el: '.swiper-pagination',
        //   },

        })
    }
}

export default swipercontainer