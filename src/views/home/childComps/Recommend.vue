<template>
<div class="recommend">
  <div v-for=" item in recommends" class = "recommend-item">
    <a>
      <img :src="item.image" alt="">
      <div>{{item.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
    export default {
        name: "recommend",
      props:{
        recommends:{
          type:Array,
          default(){
            return[]
          }
        }
      }
    }
</script>

<style scoped>
  .recommend{
    display: flex;
    font-size: 12px;
    padding: 10px 10px;
    border-bottom: 8px #eee solid ;
  }
  .recommend-item{
    flex: 1px;
    text-align: center;
  }
  .recommend-item img{
    width: 75px;
    width: 75px;
    margin-bottom: 10px
  ;
  }
</style>
