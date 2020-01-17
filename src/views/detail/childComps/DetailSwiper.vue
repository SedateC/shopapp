<template>
  <div>
    <swiper class="detail-swiper" v-if="topImages.length">
      <swiper-item v-for="(img,index) in topImages" :key = 'index'>
        <img :src="img" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper,SwiperItem} from 'components/common/swiper';
  export default {
        name: "DetailSwiper",
        components:{
          Swiper,
          SwiperItem
        },
    props:{
      topImages:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
.detail-swiper{
  height: 300px;
}
  .detail-swiper img{
    width: 100%;
    height: 300px;
  }
</style>
