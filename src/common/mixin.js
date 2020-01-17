import {debounce} from "./common";
import backTop from "components/content/backtop/BackTop";
export const itemListenerMixin = {
  data(){
    return{
      newRefresh:null,
      itemImageListener:null
    }
  },
  mounted(){
    this.newRefresh = debounce(this.$refs.scroll.refresh,100);
    this.itemImageListener = ()=>{
      this.newRefresh();

    }
    this.$bus.$on('itemImageLoad',this.itemImageListener);
    console.log("我是混入的内容");
  }
}

export const backTopMixin = {
  data(){
    return{
      isShowImg:false,
    }
  },
  components:{
    backTop
  },
  methods:{
    isShowBackTop(pos){
      if (-pos.y > 1000){
        this.isShowImg = true;
      }else {
        this.isShowImg = false;
      }
    },
    backToTop(){
      this.$refs.scroll.scrollTo(0,0,300)
    },
  }
}

