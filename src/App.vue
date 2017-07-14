<template>
  <div id="app">
    <nav-view></nav-view>
    <router-view></router-view>
    <footer>
      <p>© Copyright 2017 catlib.io All Rights Reserved</p>
      <p>喵喵喵，快来一起玩喵~</p>
    </footer>
  </div>
</template>

<script>
import '@/assets/stylus/base.styl'
import Nav from '@/components/modules/Nav'
export default {
  name: 'app',
  components: {
    'nav-view': Nav,
  },
  mounted:function(){
    this.$store.commit('env/reClientId')

    var baseUrl = this.$store.getters["env/baseUrl"]
    if(baseUrl != null && baseUrl != ""){
      this.$store.commit('env/changeHost', baseUrl)
    }

    setInterval(() => {
      this.$store.dispatch('console/refresh')
    }, 1000)
  }
}
</script>

<style scoped lang="stylus">
@import "assets/stylus/_settings"
#app
  min-width 900px
footer
  padding 50px
  text-align center
  p
    padding 5px
    
</style>