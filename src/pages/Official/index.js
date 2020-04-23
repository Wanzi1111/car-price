import React, { Component } from 'react'
import { connect } from "react-redux"
import LazyLoad from "react-lazy-load"
import api from "../../api/"
import Rightslide from "@/components/Rightslide"
class official extends Component {
    state = {
        flag: false,
        carType: []
    }
    render() {
        const { branList } = this.props

        return (
            <div className="big">
                <div className="left" ref="doc">
                    {
                        Object.keys(branList).map((item, index) => {
                            return <div key={index}>
                                <p className="left_list" id={item}>{item}</p>
                                {
                                    branList[item].map((val, index) => {
                                        return <ul key={index} className="dl" onClick={() => this.clickslide(val.MasterID)}>
                                            <li className="imges">
                                                <LazyLoad><img src={val.CoverPhoto} alt="" /></LazyLoad>
                                            </li>
                                            <li className="text">{val.Name}</li>
                                        </ul>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
                <div className="right">
                    <span onClick={() => this.clickfn('top')}>#</span>
                    {
                        Object.keys(branList).map((item, index) => {
                            return <span className="sp" key={index} onClick={() => this.clickfn(item)}>{item}</span>
                        })
                    }
                </div>
                <Rightslide
                    setflag={this.state.flag}
                    CarTypedata={this.state.carType}
                    closefn={() => this.closeslide()}
                    that={this.props}
                />
            </div>
        )
    }
    componentDidMount() {
        //    首页车列表
        api.getcarList().then(res => {
            //   console.log(res.data.dsata)
            this.props.getBandList(res.data.data)
        })
    }
    // 点击显示楼层
    clickfn(index) {
        if (index === "top") {
            this.refs.doc.scrollTop = 0;
            return
        }
        let text = document.getElementById(index)
        const textTop = text.offsetTop;
        this.refs.doc.scrollTop = textTop;
    }
    // 打开右滑弹框
    clickslide(MasterID) {
        this.setState({
            flag: true,
        })
        // 汽车车系数据
        api.getcatType({ MasterID }).then(res => {
            const { code, data } = res.data
            if (code === 1) {
                this.setState({
                    carType: data
                })
            }
        })
    }
    // 关闭右滑弹框
    closeslide() {
        // 判断现在滑框是否打开   为真时关闭
        const { flag } = this.state
        if (flag) {
            this.setState({
                flag: false
            })
        }
    }
}
let mapPropState = (state) => {
    return {
        ...state.car
    }
}
let mapPropsdispath = (dispatch) => {
    return {
        getBandList(data) {
            dispatch({
                type: "GET_BAND_LIST",
                data: data
            })
        }
    }
}

export default connect(mapPropState, mapPropsdispath)(official)