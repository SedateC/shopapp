import axios from 'axios';
export  function request(config) {
  const instance = axios.create({
     baseURL : "http://123.207.32.32:8000/api/hy",
      timeout:'5000',
  })
    //过滤请求头 必须返回config
    instance.interceptors.request.use(config=>{
      return config;
    },error => {
      //网络断开
      return error;
    }),
    instance.interceptors.response.use(res=>{
      console.log(res)
      return res;
    },error => {
      console.log(error)
      return error;
    })
  return instance(config)
}
