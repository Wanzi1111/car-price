import request from "@/utils/request";
export default {
    // 获取车列表
    getcarList: () => request.get("/v2-car-getMasterBrandList.html"),
    // 获取汽车车系数据
    getcatType: (params) => request.get("/v2-car-getMakeListByMasterBrandId.html", params),
    // 获取车系详情
    getcarText: (params) => request.get("/v2-car-getInfoAndListById.html", params),
    // 获取汽车图片列表
    getcarimg:(params)=>request.get("/v2-car-getImageList.html",params),
    // 获取汽车列表
    getcarall:(params)=>request.get("/v2-car-getCategoryImageList.html",params),
    // 获取汽车颜色列表
    getcarcolor:(params)=>request.get("/v2-car-getModelImageYearColor.html",params),

}