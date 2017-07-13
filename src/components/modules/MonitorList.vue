<template>
  <div class="monitor-list clear">
    <div v-for="(monitor, index) in monitors" v-if="index < monitorMaxNum" :key="monitor.value" class="monitor-block">
        <h1>{{ monitor.name }}</h1>
        <h2>{{ monitor.value }}<span>{{ monitor.unit }}</span></h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'monitor_module',
  props:['monitorMaxNum'],
  data () { 
    return {
      monitors: [
        {  name : 'CPU平均值' , unit : 'MS' ,value: '32' }, 
        {  name : '堆内存' , unit : 'MB' ,value: '32'}, 
        {  name : '总内存' , unit : 'MB' ,value: '32'}, 
        {  name : 'FPS' , unit : '/S',value: '32' }, 
        {  name : '上行流量' , unit : 'KB',value: '32' }, 
        {  name : '下行流量' , unit : 'KB' ,value: '32'},
        {  name : '下行流量' , unit : 'KB',value: '32' },
        {  name : '下行流量' , unit : 'KB',value: '32' },
        {  name : '下行流量' , unit : 'KB' ,value: '32'},
        {  name : '下行流量' , unit : 'KB' ,value: '32'},
        {  name : '下行流量' , unit : 'KB',value: '32' }, 
        {  name : '下行流量' , unit : 'KB' ,value: '32'},
        {  name : '下行流量' , unit : 'KB' ,value: '32'}, 
        {  name : '下行流量' , unit : 'KB' ,value: '32'},
        {  name : '下行流量' , unit : 'KB',value: '32' },
      ]
    } 
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