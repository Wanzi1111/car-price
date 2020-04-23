import request from "@/utils/request";
export default {
    // IP定位接口
    getIPCar:()=>request.get("/location-client.html"),
    // 获取经销商列表
    getDealerlist:(params)=>request.get("/v2-dealer-alllist.html",params),
    // 获取全国城市
    getAllcity:(params)=>request.get("/v1-city-alllist.html",params),
    // 询问最低价接口
    getSubmit:(params)=>request.get("/h2-submit-lowprice.html",params)

    
}