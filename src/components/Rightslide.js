import React, { Component } from 'react'
export default class rightalert extends Component {
    render() {
        return (
            <div className={this.props.setflag ? "on" : "right_aslide"}>
                {
                    this.props.CarTypedata.map((val, index) => {

                        return <div key={val.GroupId}>
                            <p className="title" onClick={() => this.props.closefn()}>{val.GroupName}</p>
                            {
                                val.GroupList.map((v, i) => {
                                    return <dl key={v.SerialID} className="type" onClick={() => this.clicktext(v.SerialID)}>
                                        <dt>
                                            <img src={v.Picture} alt="" />
                                        </dt>
                                        <dd>
                                            <p>{v.AliasName}</p>
                                            <span>{v.DealerPrice}</span>
                                        </dd>
                                    </dl>
                                })
                            }
                        </div>
                    })
                }
            </div>
        )
    }
    // 点击跳详情
    clicktext(SerialID) {
        // 跳转车系详情
        this.props.that.history.push("/car/" + `${SerialID}`)
    }


}
