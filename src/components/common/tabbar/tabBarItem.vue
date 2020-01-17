<template>
  <div class="tab-bar-item" @click="itemClick" >
    <div v-if="!isActive"> <slot name="item-icon"></slot></div>
    <div v-else="isActive"> <slot name="item-icon-active"></slot></div>
    <div :style="isActiveStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
    export default {
      name: "tabBarItem",
      props:{
        path:String,
        activeColor: {
          type : String,
          default : 'red'
        }
      },
      data(){
          return {
          }
      },
      computed:{
        isActive:{
          get () {
            return this.$route.path.indexOf(this.path) !== -1;
          },
          set(){
            return this.$route.path.indexOf(this.path) !== -1;
          }
        },
        isActiveStyle(){
         return this.isActive ? {color :this.activeColor }:{}
        }
      },
      methods:{
        itemClick (){
          //解决重复点击问题
          if (this.$route.path === this.path) return;
          console.log(this.path ),
          this.$router.push(this.path);
          this.isActive = true;
        }
      }
    }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-bottom: 2px;
    margin-top: 3px;
  }
  .active{
    color: red;
  }

</style>
