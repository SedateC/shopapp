<template>
  <div id ="home">
    <navBar class="home-NavBar">
      <div slot="center">购物车</div>
    </navBar>
    <tab-Control :titles="['流行','新款','精选']" class="tabControl" @tabClick="tabClick" v-show="isTabFixed" ref="tabControl1"></tab-Control>
    <scroll ref="scroll"
            class="content"
            :probeType=3
            :listenScroll="true"
            :data="[]"
            @scroll="onScroll"
            :pullup="true"
            @scrollToEnd = 'scrollToEnd'>
        <div >
          <homeSwiper :banners = banners class="homeSwiper" @SwipeImageLoad = 'SwipeImageLoad'></homeSwiper>
          <recommend-View :recommends = "recommend" ></recommend-View>
          <feature-View></feature-View>
          <tab-Control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-Control>
          <goods-list :goods="showGoods"></goods-list>
        </div>
    </scroll>
    <backTop class="backTop" @click.native="backToTop" v-show="isShowImg"></backTop>
  </div>
</template>

<script>
  import navBar from 'components/common/navbar/NavBar';
  import homeSwiper from './childComps/HomeSwiper'
  import {
    getHomeMultidata,
    getHomeGoods
  } from '@/network/homeApi'
  import recommendView from "./childComps/Recommend"
  import featureView from "./childComps/Feature"
  import tabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goodsItem/GoodsList";
  import scroll from "components/common/betterscroll/BetterScroll";
  import backTop from "components/content/backtop/BackTop";
  import {debounce} from "common/common";
  import {itemListenerMixin} from 'common/mixin';
  import {backTopMixin} from "../../common/mixin";
  export default {
      name: "Home",
      components:{
        GoodsList,
        navBar,
        homeSwiper,
        recommendView,
        featureView,
        tabControl,
        scroll,
        backTop
      },
    mixins:[itemListenerMixin],
    data(){
      return{
        banners : [],
        recommend : [],
        goods: {
        'pop': {page:0,list:[]},
        'new': {page:0,list:[]},
        'sell': {page:0,list:[]},
        },
        currentType:'pop',
        data:[],
        isShowImg:false,
        tabOffsetTop:'',
        isTabFixed:false,
        saveY:0,//离开时记录位置
        itemImageListener:null,
      }
    },
    created() {
      console.log("create");
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    destroyed(){
      console.log("destroyed");
    },
    mounted(){
      console.log("mounted");
    /*  // 事件总线 ref不能再create 上面做 图片加载完成刷新scroll

      this.$bus.$on('itemImageLoad',() =>{
      //  if (this.$refs.Scroll&&this.$refs.Scroll.refresh) {
          const  refresh = debounce(this.$refs.Scroll.refresh(),300)
      })*/
    },
    //keepAline作用方法
    activated(){
      console.log('activated  this.saveY'+ this.saveY);
      this.$refs.scroll.scrollTo(0,this.saveY,100);
      this.$refs.scroll.refresh();
    },
    deactivated(){
      console.log('deactivated');
      this.saveY = this.$refs.scroll.scroll.y;
      this.$bus.$off('itemImageLoad',this.itemImageListener)
    },
    computed:{
        showGoods(){
          return this.goods[this.currentType].list;
        }
    },
    mixins:[backTopMixin],
    methods:{
        /*
        * 网络请求
        * */
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          this.banners = res.data.data.banner.list;
          this.recommend = res.data.data.recommend.list;
          console.log(this.recommend);
        })
      },
      getHomeGoods(type){
        //因为type是关键字 所以要用这种抽取方法
        const page = this.goods[type].page +1;
        getHomeGoods(type,page).then(res =>{
          console.log(res);
         this.goods[type].list.push(...res.data.data.list);
         this.goods[type].page += 1;
        })
      },

      /*
      * 事件监听
      * */
      tabClick(index){
        console.log(index);
        switch (index) {
          case 0:this.currentType = 'pop'
                break;
          case 1:this.currentType = 'new'
                break
          case 2:this.currentType = 'sell'
                break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      loadData(){

      },
      scrollToEnd(){
        console.log("加载到底部自动加载更多数据");
        this.getHomeGoods(this.currentType);
        this.$refs.scroll.finishPullUp();
      },

      onScroll(pos){
        this.isShowBackTop(pos);
        this.isTabFixedShow(pos);
      },
      //获取幻灯片加载完成后tabControl的OffsetTop
      SwipeImageLoad(){
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      isTabFixedShow(pos){
      //  console.log(pos.y+"this.tabOffsetTop"+this.tabOffsetTop);
        if (-pos.y >= this.tabOffsetTop){
          this.isTabFixed = true;
        }else {
          this.isTabFixed = false;
        }
      }
    }
  }
</script>

<style scoped>
  #home{
    position:relative;
    height: 100vh;
  }
  .home-NavBar{
    background-color: var(--color-tint);
    color: white;
  }
  .tabControl{
    position: relative;
    top: 44px;
    background-color: #fff;
    z-index: 10;
  }
  .homeSwiper{
  }
  .content{
    position:absolute;
    top: 44px;
    right: 0px;
    left: 0;
    bottom: 49px;
    overflow: hidden;
  }
  .backTop{

  }
  .fixed{

  }
</style>
