<template>
  <div class="console">
    <div class="monitor clear">
      <div v-for="(monitor, value) in monitors" :key="monitor.value" class="monitor-block">
        <h1>{{ monitor.name }}</h1>
        <h2>{{ monitor.value }}<span>{{ monitor.unit }}</span></h2>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  name: 'console',
  data () {
    return {
      monitors: [
                  { name : 'CPU平均值' , value : '堆内存' , unit : 'MS' },
                  { name : '堆内存' , value : '5.2' , unit : 'MB' },
                  { name : '总内存' , value : '99.4' , unit : 'MB' },
                  { name : 'FPS' , value : '32' , unit : '/S' },
                  { name : '上行流量' , value : '123' , unit : 'KB' },
                  { name : '下行流量' , value : '273' , unit : 'KB' },
              ]
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../assets/stylus/_settings"

.console
  padding $global-margin
  .monitor
    .monitor-block
      margin 0px 5px 0px 5px
      padding 10px
      width 165px
      height 75px
      background-color $bg-color-v3
      float left
      h1
        font-size 15px 
    
</style>