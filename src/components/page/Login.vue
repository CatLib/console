<template>
  <div class="login">
    <img src="../../assets/imgs/phone.svg"></img>
    <div class="input">
      <input type="text" v-model="host" v-on:keyup.enter="commit">
    </div>
    <p>请输入要调试设备的IP地址,如:<span>192.168.1.1:9478</span></p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      host: ''
    }
  },
  mounted: function(){
    this.host = this.$store.getters["env/baseUrl"]
  },
  methods: {
    commit : function()
    {
      this.$store.commit('env/changeHost', this.host)
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../../assets/stylus/_settings"

.login
  margin 0 $global-margin $global-margin $global-margin
  min-height 700px 
  background-color $bg-color-v2
  border-radius 5px
  text-align center
  p
    padding 20px 0px 0px 0px
    font-weight normal
    span
      margin 0px 7px 0px 7px
      padding 3px
      background-color $bg-color-v7
      display inline-block
      border-radius 3px
  img
    width 200px
    height 200px
    padding-top 150px
  .input
    padding-top 50px
    input
      padding 10px
      height 20px
      width 300px
      border 0px
      border-radius 5px
      font-size 16px
      line-height 16px
      letter-spacing 3px
      text-align center
      font-weight bold
      color $bg-color-v3
      background-color $bg-color-v6

</style>