<template>
  <div class="monitor-list clear">
    <div v-for="(monitor, index) in monitors['monitorData']" v-if="index < monitorMaxNum" :key="monitor.value" class="monitor-block">
        <h1>{{ monitors['monitorElement'][index].name }}</h1>
        <h2>{{ monitor.value }}<span>{{ monitors['monitorElement'][index].unit }}</span></h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'monitor_module',
  props:['monitorMaxNum'],
  data () { 
    return {
      monitors: {
        monitorElement: { 
          0 : {  name : 'CPU平均值' , unit : 'MS' }, 
          1 : {  name : '堆内存' , unit : 'MB' }, 
          2 : {  name : '总内存' , unit : 'MB' }, 
          3 : {  name : 'FPS' , unit : '/S' }, 
          4 : {  name : '上行流量' , unit : 'KB' }, 
          5 : {  name : '下行流量' , unit : 'KB' },
          6 : {  name : '下行流量' , unit : 'KB' },
          7 : {  name : '下行流量' , unit : 'KB' },
          8 : {  name : '下行流量' , unit : 'KB' },
          9 : {  name : '下行流量' , unit : 'KB' },
          10 : {  name : '下行流量' , unit : 'KB' }, 
          11: {  name : '下行流量' , unit : 'KB' },
          12 : {  name : '下行流量' , unit : 'KB' }, 
          13 : {  name : '下行流量' , unit : 'KB' },
          14 : {  name : '下行流量' , unit : 'KB' },
        },
        monitorData:{
          0 : { value: '32' },
          1 : { value: '5' },
          2 : { value: '99' },
          3 : { value: '32' },
          4 : { value: '123' },
          5 : { value: '273' },
          6 : { value: '32' },
          7 : { value: '5' },
          8 : { value: '99' },
          9 : { value: '32' },
          10 : { value: '123' },
          11 : { value: '273' },
          12 : { value: '32' },
          13 : { value: '123' },
          14 : { value: '273' },
        }
      }
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