import {request} from 'network/utils/request';
export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  })
}
export function getHomeGoods(type,page) {
  console.log(page);
  return request({
   url:'/home/data',
   params:{
     page,
     type,
   }
  })
}

