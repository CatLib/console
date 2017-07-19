<template>
  <div class="monitor-list clear">
    <div v-for="(monitor, index) in monitors" v-if="index < monitorMaxNum" :key="monitor.value" class="monitor-block">
        <h1>{{ monitor.name }}</h1>
        <h2>{{ monitor.value }}<span>{{ monitor.unit }}</span></h2>
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
      monitors: []
    } 
  },
  methods:{
    refreshMonitor(){
      debugMonitor.getMonitors(function(response){
        console.dir(response)
      },function(response){
        //faild
      });
    }
  },
  created: function(){
    console.dir("created")
  },
  beforeDestroy:function(){
    console.dir("before destroy")
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