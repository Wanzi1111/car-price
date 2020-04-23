import axios from "axios";
import router from "../router/index";
const request=axios.create({
    baseURL:""
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token=window.localStorage.getItem("logintoken")
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (data) {
    // 对响应数据做点什么
    return data;
  }, function (error) {
      switch(error.response.status){
          case 404:
          alert("接口走丢了");
          router.push("/404")
          break;
          case 401:
          alert("你可能未登录，请重新登录");
          break;
          case 403:
          alert("您没有权限访问");
          break;
          case 500:
          alert("服务器报错");
          break;
          case 406:
          alert("您的参数不合法");
          break;
          default:
          alert("报错了")
      }
    // 对响应错误做点什么
    return Promise.reject(error);
  });
export default{
    get(url,params={}){
        return request.get(url,{params})
    },
    post(url,data={}){
        return request.post(url,data)
    }
}
