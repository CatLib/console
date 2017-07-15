<template>
  <div class="nav">
    <img src="../../assets/imgs/logo.png"></img>
    <h1>CatLib 调试控制台 <span v-if="isShowReConnect">与设备 {{ getHostPort }} 断开链接,正在重连...</span></h1>
    <ul v-if="isShowNav" class="clear">
      <li><a href="#" @click="resetDriver">切换设备</a></li>
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
        { name : '数据监控' , url : "/monitor" } , 
        { name : '控制台' , url : "/console"} 
      ]
    }
  },
  methods:{
    resetDriver : function(){
      this.$store.commit("env/reClientId")
      this.$store.commit("env/changeHost" , null)
    }
  },
  computed: {
    getHostPort : function(){
      return this.$store.getters["env/hostPort"]
    },
    isShowReConnect: function(){
      return this.$store.getters["env/authorizd"] && !this.$store.getters["env/isConnect"]
    },
    isShowNav: function(){
      return this.$store.getters["env/authorizd"]
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../../assets/stylus/_settings"
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
    span
      font-size 12px
      font-weight normal
      position relative
      padding 2px 4px 2px 4px
      background-color rgb(65,65,65)
  ul
    float right
    height $height
    li
      float right
      padding 5px
      height $height - 5px * 2
      line-height $height - 5px * 2
    li 
      a:hover
        text-decoration none
        color $bg-color-v7
</style>