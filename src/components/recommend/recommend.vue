<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <slider>
            <div :key="index" v-for="(item, index) in recommends">
              <a :href="item.linkUrl">
                <img class="needsclick" @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li @click="selectItem(item)" v-for="(item, index) in discList" :key="index" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading/>
      </div>
    </scroll>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '@/base/scroll/scroll'
  import {getDiscList} from '@/api/recommend'
  import {getBanner} from '@/api/api'
  import Slider from '@/base/slider/slider'
  import Loading from '@/base/loading/loading'
  import {playlistMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'

  export default {
    data() {
      return {
        recommends: [],
        discList: []
      }
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    mixins: [playlistMixin],
    methods: {
      _getRecommend() {
        getBanner().then(res => {
          let sliderdata = res.banner
          let lastitem = sliderdata[sliderdata.length - 1]
          let firstitem = sliderdata[0]
          sliderdata.push(firstitem)
          sliderdata.unshift(lastitem)
          this.recommends = sliderdata
        })
        // getRecommend().then((res) => {
        //   if (res.code === 0) {
        //     let sliderdata = res.data.slider
        //     sliderdata.shift()
        //     sliderdata.shift()
        //     let lastitem = sliderdata[sliderdata.length - 1]
        //     let firstitem = sliderdata[0]
        //     sliderdata.push(firstitem)
        //     sliderdata.unshift(lastitem)
        //     console.log(JSON.stringify(sliderdata))
        //     this.recommends = sliderdata
        //   }
        // })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === 0) {
            this.discList = res.data.list
          }
        })
      },
      loadImage() {
        if (!this.checkloaded) { // 只调一次
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.recommend.style.bottom = bottom
        this.$refs.scroll.refresh()
      },
      selectItem(item) {
        this.$router.push({
          path: `/recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    },
    components: {
      Slider,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            text-align left
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
