<template>
  <div class = "goods" >
  <goods-item v-for="item in goods" :goods-item = "item" class="goodsItem" @click="itemClick"></goods-item>
  </div>
</template>

<script>
    import GoodsItem from "./GoodsItem";
    export default {
        name: "GoodsList",
      components: {GoodsItem},
      props:{
        goods:{
          type:Array,
          default(){
            return []
          }
        }
      },
      methods:{
        itemClick(index){

        }
      }
    }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap:wrap;
    justify-content: space-around;
    padding: 0px 2px;
  }
  .goodsItem{
    width: 48%;
  }
</style>
