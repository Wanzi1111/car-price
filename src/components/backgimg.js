import React, { Component } from 'react'

export default class backgimg extends Component {
    render() {
        const {url,onClick,ImageID,count}=this.props
        return (
            <div onClick={()=>onClick(ImageID,count)}>
               <img src={url} alt=""/>
            </div>
        )
    }
}
