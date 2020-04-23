const files = require.context('./',false,/\.js$/);

const api = files.keys().filter(item=>!item.includes('index')).reduce((prev,item)=>{
    prev = {
        ...prev,
        ...files(item).default
    }
    return prev;
},{})


export default api;