<template>
  <div class="nav">
    <img src="../assets/imgs/logo.png"></img>
    <h1>CatLib 调试控制台</h1>
    <ul class="clear">
      <li v-for="(key, value) in navs" :key="key">
        <router-link :to="key.url">{{ key.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'nav',
  data () {
    return {
      'navs' : [ 
        { name : '调试日志' , url : "/log" } , 
        { name : '数据监控' , url : "/monitor" } , 
        { name : '控制台' , url : "/console"} 
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../assets/stylus/_settings"
$width = 30px
$height = 30px
.nav
  height $height
  padding $global-margin + 5
  img
    float left
    width $width
    height $width
  h1
    float left
    height $height
    line-height $height
    padding-left 10px
    font-size 16px
  ul
    float right
    height $height
    li
      float right
      padding 5px
      height $height - 5px * 2
      line-height $height - 5px * 2
</style>