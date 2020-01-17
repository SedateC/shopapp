<template>
    <div v-if="Object.keys(goods).length !== 0" class="base-info">
      <div class="base-title">{{goods.title}}</div>
      <div class="base-price">
        <span class="n-price">{{goods.newPrice}}</span>
        <span class="o-price">{{goods.oldPrice}}</span>
        <span class="discount">{{goods.discount}}</span>
      </div>
      <div class="info-other">
        <span>{{goods.columns[0]}}</span>
        <span>{{goods.columns[1]}}</span>
        <span>{{goods.services[goods.services.length-1].name}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "DetailBaseInfo",
      props:{
        goods:{
          type:Object,
          default(){
            return{}
          }
        }
      }
    }
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0px 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
  .base-title {
    color: #222;
    line-height: 20px;
    font-size: 14px;
  }
  .base-price{
    margin-top: 10px;
    position: relative;
    padding: 2px 5px;
  }
  .n-price{
    color: #ff5777;
  }
  .o-price{
    font-size: 12px;
    text-decoration: line-through;
    padding: 0px 3px;
  }
  .discount{
    position: absolute;
    padding: 2px 5px;
    top: -8px;
    font-size: 12px;
    color: white;
    background-color: var(--color-high-text);
    border-radius: 8px;
  }
  .info-other{
    display: flex;
    margin-top: 5px;
    font-size: 12px;
    line-height: 30px;
    justify-content: space-between;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

</style>
