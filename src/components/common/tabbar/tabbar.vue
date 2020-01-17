<template>
  <div id = "tab-bar">
    <slot></slot>
  </div>
</template>
<script>
    export default {
        name: "tabBar"
    }
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background-color: #f6f6f6;
    box-shadow: 0px -1px 0px rgb(100,100,100.1);
    position: fixed;
    left: 0px;
    bottom: 0px;
    right: 0px;
  }


</style>
