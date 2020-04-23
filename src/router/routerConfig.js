import React from "react";
import loadable from "react-loadable";
const loading = ()=><div>loading...</div>;
const routes=[{
    path:"/official",
    component:loadable({
        loader:()=>import("@/pages/Official"),
        loading
    })
},{
    path:"/car/:id",
    component:loadable({
        loader:()=>import("@/pages/Car"),
        loading
    })
},{
    path:"/img/:id",
    component:loadable({
        loader:()=>import("@/pages/Img"),
        loading
    })
},{
    path:"/quotation/:id",
    component:loadable({
        loader:()=>import("@/pages/Quotation"),
        loading
    })
},{
    path:"/Selectpage",
    component:loadable({
        loader:()=>import("@/pages/Selectpage"),
        loading
    })
},{
    path:"*",
    component:()=><div>汽车之家 页面找不到啦！</div>
},{
    path:"/",
    redirect:"/official"
}]
export default routes
