<template>
  <div id="app" @touchmove.prevent>
    <m-header/>
    <tab/>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import Tab from 'components/tab/tab'
  import MHeader from 'components/m-header/m-header'
  import Player from 'components/player/player'

  export default {
    components: {
      MHeader,
      Player,
      Tab
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
