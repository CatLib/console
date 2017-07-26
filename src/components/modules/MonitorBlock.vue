<template>
  <div class="monitor-list clear">
    <div v-for="(monitor, index) in monitors" v-if="index < monitorMaxNum && monitor.value != 'code.notSupport'" :key="index" class="monitor-block">
        <h1>{{ monitor.name|i18n }}</h1>
        <h2 v-if="$t(monitor.value).length <= 6">{{ monitor.value|i18n }}<span>{{ monitor.unit|i18n }}</span></h2>
        <h3 v-else-if="$t(monitor.value).length <= 8">{{ monitor.value|i18n }}<span>{{ monitor.unit|i18n }}</span></h3>
        <h4 v-else>{{ monitor.value|i18n }}<span>{{ monitor.unit|i18n }}</span></h4>
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
    this.refreshMonitor()
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
      span
        font-size 16px
        margin-left 7px
      h1
        font-size 13px 
        padding-bottom 20px
      h2
        font-size 32px
        text-align right
      h3
        font-size 22px
        text-align right
      h4
        font-size 15px
        text-align right
</style>