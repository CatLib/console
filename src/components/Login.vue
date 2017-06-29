<template>
  <div class="login">
    <img src="../assets/imgs/phone.png"></img>
    <div class="input">
      <input type="text" v-model="host" v-on:keyup.enter="commit">
    </div>
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
  methods: {
    commit : function()
    {
      this.$store.commit('env/changeHost', this.host)
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../assets/stylus/_settings"

.login
  margin 0 $global-margin $global-margin $global-margin
  min-height 800px 
  background-color $bg-color-v3
  border-radius 5px
  text-align center
  img
    width 200px
    height 200px
    padding-top 150px

</style>