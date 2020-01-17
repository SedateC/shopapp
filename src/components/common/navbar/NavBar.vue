<template>
    <div id = "navBar">
      <div class="left"><slot name = "left"></slot></div>
      <div class="center"><slot name = "center"></slot></div>
      <div class="right"><slot name = "right"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
  #navBar{
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0px 1px 0px rgba(100,100,100,.1);
  }
  .left,.right{
    width: 60px;
  }
  .center{
    flex: 1;
    text-align: center;
  }
</style>
