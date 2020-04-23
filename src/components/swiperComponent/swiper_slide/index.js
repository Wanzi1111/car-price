import React, { Component } from 'react'

class swiperslide extends Component {
    render() {
        return (
            <div className="swiper-slide">
            {this.props.children} 
            </div>
        )
    }
}
export default swiperslide
