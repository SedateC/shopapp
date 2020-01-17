<template>
  <div id="mainTabBar">
    <tabBar>
      <tabBarItem path ="/home" activeColor ="blue">
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text">首页</div>
      </tabBarItem>
      <tabBarItem  path ="/category">
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-text">分类</div>
      </tabBarItem>
      <tabBarItem path ="/cart">
        <img slot="item-icon" src="@/assets/img/tabbar/cart.svg" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabbar/cart_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </tabBarItem>
      <tabBarItem path ="/profile">
        <img slot="item-icon" src="@/assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text">个人中心</div>
      </tabBarItem>
    </tabBar>
  </div>
</template>

<script>
  import tabBar from 'components/common/tabbar/tabbar';
  import tabBarItem from 'components/common/tabbar/tabBarItem'
  export default {
    name: "mainTabBar",
    components:{
      tabBar,
      tabBarItem,
    }
  }
</script>
<style>


</style>
