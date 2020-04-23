import React, { Component } from 'react'
export default class City extends Component {
    render() {
        const {alertcity,onClick,allCity}=this.props
        return (                
             <div className={alertcity?"city_box":"oncity_box"}>
             {
                 allCity.map((val,index)=>{
                     return <p key={val.CityID} onClick={()=>onClick(val.CityID,val.CityName)}>{val.CityName}</p>
                 })
             }
    
            </div>
                
             
        )
        }
}
