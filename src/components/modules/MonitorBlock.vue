<template>
  <div class="monitor-list clear">
    <div v-for="(monitor, index) in monitors" v-if="index < monitorMaxNum" :key="index" class="monitor-block">
        <h1>{{ monitor.name|i18n }}</h1>
        <h2>{{ monitor.value }}<span>{{ monitor.unit|i18n }}</span></h2>
    </div>
  </div>
</template>

<script>
import debugMonitor from '../../api/debug.monitor'
export default {
  name: 'monitor_module',
  props:['monitorMaxNum'],
  data () { 
    return {
      monitors: [],
      timer :null
    } 
  },
  methods:{
    refreshMonitor(){
      var vueComponent = this;
      debugMonitor.getMonitorsIndex(function(response){
        vueComponent.monitors = response.data.Response
      },function(response){
        //faild
      });
    }
  },
  mounted: function(){
    this.timer = setInterval(() => {
      this.refreshMonitor()
    }, 1000)
  },
  beforeDestroy:function(){
    clearInterval(this.timer)
  }
}
</script>

<style scoped lang="stylus">
@import "../../assets/stylus/_settings"
  .monitor-list
    .monitor-block
      margin 0px 5px 10px 5px
      padding 10px
      width 165px
      height 75px
      background-color $bg-color-v3
      float left
      h1
        font-size 13px 
        padding-bottom 20px
      h2
        font-size 32px
        text-align right
        span
          font-size 16px
          margin-left 7px
</style>