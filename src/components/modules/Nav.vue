<template>
  <div class="nav">
    <img src="../../assets/imgs/logo.png"/>
    <h1>{{"ui.title"|i18n}} <span v-if="isShowReConnect">{{ $t("ui.disconnect" , { "host" : getHostPort}) }}</span></h1>
    <ul class="clear">
      <li><a @click="changeLang">{{lang}}</a></li>
      <li v-if="isShowNav"><a href="#" @click="resetDriver">{{"ui.nav.driver"|i18n}}</a></li>
      <li v-for="(key, value) in navs" :key="key">
        <router-link :to="key.url" v-if="isShowNav">{{ key.name|i18n }}</router-link>
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
        { name : 'ui.nav.monitor' , url : "/monitor" } , 
        { name : 'ui.nav.console' , url : "/console"} 
      ]
    }
  },
  methods:{
    resetDriver : function(){
      this.$store.commit("env/reClientId")
      this.$store.commit("env/changeHost" , null)
    },
    changeLang:function(){
      var lang = this.$i18n.locale() == "en"?"zh":"en";
      this.$i18n.set(lang)
      window.localStorage.setItem("lang", lang)
      return true
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
    },
    lang:function(){
      return this.$i18n.locale() == "en" ? "中文" : "English"
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
        cursor pointer
</style>