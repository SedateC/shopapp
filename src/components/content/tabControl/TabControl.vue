<template>
    <div class="tab-control">
      <div v-for="(title,index ) in titles"
           class="tab-control-item"
           :class="{active:index === currentIndex }" @click="tabClick(index)">
        <span>{{title}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
      data(){
        return{
          currentIndex:0,
        }
      },
      props:{//传进来不同的文字
          titles:{
            type:Array,
            default(){
              return []
            }
          }
      },
      methods:{
        tabClick(index){
          this.currentIndex = index;
          this.$emit('tabClick',index)
        }
      }
    }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
  }
  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    padding: 4px 0px;
    border-bottom:3px solid var(--color-tint);
  }
</style>
