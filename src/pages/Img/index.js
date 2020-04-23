import React, { Component } from 'react'
import api from "@/api/car"
import Brougimg from "../../components/backgimg";
import AlertCar from "@/components/alertCar/index";
import AlertColor from "@/components/alertColor/index"
import Swiperbig from "@/components/Swiperbig/index"

export default class Img extends Component {
    state = {
        imgdata: [],
        flag: true,
        show: true,
        picytredata: {},
        alertflag: false,
        alertcolor: false,
        allColor: {},
        Count:0

    }
    render() {
        const { imgdata, flag, show, picytredata, alertflag, alertcolor, allColor ,Count} = this.state
        return (
            <div>
                <div className="Img_box">
                    <div className="head">
                        <span onClick={this.clickallColor}>颜色<i className="iconfont icon-ai-arrow-down"></i></span>
                        <span onClick={this.clickallCar}>车款<i className="iconfont icon-ai-arrow-down"></i></span>
                    </div>
                    {
                        imgdata.map((item, index) => {
                        // console.log(item)
                            return <div className="img_type" key={index}>
                                {
                                    
                                    item.List.map((val, index) => <div className="imges" key={index}>
                                        {
                                            (index === 0) ? <div className="mask" onClick={() => this.setflagtwo(item.Id,item.Count)}>
                                                <p>{item.Name}</p>
                                                <p>{item.Count}张  ></p>
                                            </div> : null
                                        }
                                        <Brougimg url={val.Url.replace("{0}", "3")}
                                            ImageID={item.Id}
                                            SerialID={this.props.match.params.id}
                                            onClick={this.setflag}
                                            count={Count}
                                             />

                                    </div>)
                                }
                            </div>
                        })
                    }
                    {/*全部车款  */}
                    <AlertCar alertflag={alertflag} clickallCar={this.clickallCar} />
                    {/* 车系颜色 */}
                    <AlertColor alertcolor={alertcolor} clickallColor={this.clickallColor} allColor={allColor} />
                </div>

                {/* 轮播弹框 */}
                {
                    flag ? <div></div> : <div className="maske_box" onClick={this.setflag}>
                    {/* 轮播组件 */}
                     <Swiperbig picytredata={picytredata} count={Count}/>
                    </div>
                }
                {/* 列表弹框 */}
                {
                    show ? <div></div> : <div className="mask_two"  onClick={this.setflag}>
                        {
                            Object.keys(picytredata).map((item, index) => {
                                return picytredata['List'].map((v, i) => {
                                    return <div className="write_box" key={i}>
                                        <Brougimg url={v.Url.replace("{0}", "3")}
                                            ImageID={picytredata['ID']}
                                            SerialID={this.props.match.params.id}
                                            onClick={this.setflag} 
                                            count={Count}/>
                                    </div>
                                })
                            })
                        }
                    </div>
                }

            </div>
        )
    }
    // 出现黑框
    setflag = (ImageID) => {
        this.setState({
            flag: !this.state.flag
        })
        if (Object.prototype.toString.call(ImageID) == "[object Number]") {
            const SerialID = this.props.match.params.id//获取车系id
            // 获取汽车图片列表
            api.getcarall({ SerialID, ImageID, Page: 1, PageSize: 30 }).then(res => {
                this.setState({
                    picytredata: res.data.data
                })
            })
        }
    }
    // 出现白框
    setflagtwo = (ImageID,count) => {
        console.log(count) //例如外观的数量
        this.setState({
            show: !this.state.show,
            Count:count
        })
        if (Object.prototype.toString.call(ImageID) == "[object Number]") {
            const SerialID = this.props.match.params.id//获取车系id
            // 获取汽车图片列表
            api.getcarall({ SerialID: SerialID, ImageID: ImageID, Page: 1, PageSize: 30 }).then(res => {
                this.setState({
                    picytredata: res.data.data
                })
            })
        }
    }
    // 车款弹框
    clickallCar = () => {
        this.setState({
            alertflag: !this.state.alertflag
        })
    }
    // 车颜色弹框
    clickallColor = () => {
        const SerialID = this.props.match.params.id//获取车系id
        this.setState({
            alertcolor: !this.state.alertcolor
        })
        // 获取车的颜色
        api.getcarcolor({ SerialID: SerialID }).then(res => {
            this.setState({
                allColor: res.data.data
            })
            // console.log(res.data.data)

        })
    }
    componentDidMount() {
        const SerialID = this.props.match.params.id//获取车系id
        // 获取汽车颜色列表
        api.getcarimg({ SerialID: SerialID }).then(res => {
            this.setState({
                imgdata: res.data.data
            })
        })
    }
}

