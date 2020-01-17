<template>
  <div>
    <Navbar class="Detail-Navbar">
      <div slot="left" class="back-icon" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class= 'title'>
        <div v-for=" (title,index) in titles" class="title-item " :class="{active:index === currentIndex}" @click="navBarClick(index)">
          {{title }}
        </div>
      </div>
    </Navbar>
  </div>
</template>

<script>
    import Navbar from 'components/common/navbar/NavBar';
    import {getDetail} from '@/network/homeApi';
    export default {
        name: "DetialNavBar",
      data(){
          return {
            titles:['商品','参数','评论','推荐'],
          }
      },
      props:{
        currentIndex:{
          type:Number,
          default(){
            return 0;
          }
        }
      },
      created(){

      },
      components:{
        Navbar
      },
      methods:{
        navBarClick(index){
          console.log('titleClick'+index);
          this.$emit('titleClick',index)
        },
        backClick(){
          this.$router.back();
        }
      }
    }
</script>

<style scoped>
  .Detail-Navbar{
    background-color: #fff;
  }
  .title{
    display: flex;
    padding: 0 20px;
    font-size: 14px;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-tint)
  }
  .back-icon{
    margin-top: 6px;
  }
</style>
