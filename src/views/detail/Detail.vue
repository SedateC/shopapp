<template>
  <div class="detail">
    <Detail-Nav-Bar class="DetailNav" @titleClick = "titleClick" :current-index="currentIndex"></Detail-Nav-Bar>
    <Better-Scroll class="scroll-content" ref="scroll" :listenScroll="true" :probeType=3 @scroll="scroll">
      <div>
        <Detail-Swiper :topImages="topImages"></Detail-Swiper>
        <Detail-Base-Info :goods = 'goods'></Detail-Base-Info>
        <Deatil-Shop-Info :shop ='shop' ref="shopInfo"></Deatil-Shop-Info>
        <Detail-Goods-Info :detailInfo = 'detailInfo' @imageLoad = 'imageLoad' ref="goodsInfo"></Detail-Goods-Info>
        <Detail-Param-Info :paramInfo = 'paramInfo' ref="param"></Detail-Param-Info>
        <Detail-Comment-Info :commentInfo="commentInfo" ref="comment"></Detail-Comment-Info>
        <GoodsList :goods = "recommends" ref="reComment"></GoodsList>
      </div>
    </Better-Scroll>
    <backTop class="backTop" @click.native="backToTop" v-show="isShowImg"></backTop>
    <Detail-Bottom-Bar></Detail-Bottom-Bar>
  </div>

</template>

<script>
  import DetailNavBar from 'views/detail/childComps/DetialNavBar';
  import DetailSwiper from 'views/detail/childComps/DetailSwiper';
  import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo';
  import DeatilShopInfo from 'views/detail/childComps/DetailShopInfo';
  import DetailGoodsInfo from 'views/detail/childComps/DetailGoodsInfo';
  import DetailParamInfo from 'views/detail/childComps/DetailParamInfo';
  import DetailCommentInfo from 'views/detail/childComps/DetailCommentInfo';
  import DetailBottomBar from 'views/detail/childComps/DetailBottomBar';
  import {getDetail,getRecommend, Goods, Shop, GoodsParam} from '@/network/detail';
  import BetterScroll from 'components/common/betterscroll/BetterScroll';
  import GoodsList from 'components/content/goodsItem/GoodsList';
  import {itemListenerMixin} from 'common/mixin';
  import {debounce} from "common/common";
  import {backTopMixin} from "common/mixin";
    export default {
        name: "Detail",
      data(){
          return {
            iid:null,
            result:{},
            detailInfo:{},
            topImages:[],
            goods:{},
            paramInfo:{},
            commentInfo:{},
            shop:{},
            recommends:[],
            itemImageListener:null,
            topBarHeightArray:[],
            currentIndex: 0
          }
      },
      mixins:[itemListenerMixin,backTopMixin],
      components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DeatilShopInfo,
        BetterScroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar
      },
      created() {
          this.iid = this.$route.params.iid;
          getDetail(this.iid).then(res=>{
            const result = res.data.result;
            this.detailInfo = result.detailInfo;
            // 2.2.获取顶部信息
            this.topImages = result.itemInfo.topImages;
            // 2.3.获取商品信息
            this.goods = new Goods(result.itemInfo, result.columns, result.shopInfo.services);
            // 2.4.获取店铺信息
            this.shop = new Shop(result.shopInfo);
            // 2.5.获取商品信息
            this.detailInfo = result.detailInfo
            // 2.6.保存参数信息
            this.paramInfo = new GoodsParam(result.itemParams.info, result.itemParams.rule);
            // 2.7.保存评论信息
            if (result.rate.list) {
              this.commentInfo = result.rate.list[0];
            }

          }),
        getRecommend().then(res=>{
          this.recommends = res.data.data.list
        })
        this.$nextTick(()=>{//方法渲染完成后执行
          console.log("方法渲染完成后执行");
        })
      },
      methods:{
        imageLoad(){
          console.log('imageLoad刷新');
          this.topBarHeightGetArray();
          this.$refs.scroll.refresh();
        },
        titleClick(index){
          console.log(this.topBarHeightArray);
          this.$refs.scroll.scrollTo(0,-this.topBarHeightArray[index],200)
          this.currentIndex = index;
        },
        topBarHeightGetArray(){
          console.log("topBarHeightGetArray");
          this.topBarHeightArray = [];
          this.topBarHeightArray.push(0);
          this.topBarHeightArray.push(this.$refs.param.$el.offsetTop);
          this.topBarHeightArray.push(this.$refs.comment.$el.offsetTop);
          this.topBarHeightArray.push(this.$refs.reComment.$el.offsetTop);
          this.topBarHeightArray.push(Number.MAX_VALUE);
          console.log(this.topBarHeightArray);
          console.log('imageLoad刷新完成');
        },
        //BetterScroll派发滚动时间
        scroll(pos){
          const position = -pos.y;
          let length = this.topBarHeightArray.length;
          for (let i = 0; i < length; i++) {
            let iPos = this.topBarHeightArray[i];
            /**
             * 判断的方案:
             *  方案一:
             *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
             *    优点: 不需要引入其他的内容, 通过逻辑解决
             *    缺点: 判断条件过长, 并且不容易理解
             *  方案二:
             *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
             *    优点: 简洁明了, 便于理解
             *    缺点: 需要引入一个较大的int数字
             * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
             * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
             */
            if (position >= iPos && position < this.topBarHeightArray[i+1]) {
              if (this.currentIndex !== i) { //减少判断次数
                this.currentIndex = i;
              }
              break;
            }
          }
          this.isShowBackTop(pos)
        }
      },
      mounted() {

      },
      updated(){
        console.log("updated");
      },
      destroyed() {
        this.$bus.$off('itemImageLoad',this.itemImageListener);
      },

    }
</script>

<style scoped>
 .detail{
   position: relative;
   z-index: 10;
   background-color: #fff;
   height: 100vh;
 }
  .scroll-content{
    height: calc(100% - 44px - 49px);
  }
  .DetailNav{
    height: 44px;
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }
</style>
