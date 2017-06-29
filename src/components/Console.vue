<template>
  <div class="console">
    <div class="monitor clear">
      <div v-for="(monitor, value) in monitors" :key="monitor.value" class="monitor-block">
        <h1>{{ monitor.name }}</h1>
        <h2>{{ monitor.value }}<span>{{ monitor.unit }}</span></h2>
      </div>
    </div>

    <div class="console-display">
      <div class="display-filter">
        <ul class="filter-group clear">
          <li v-for="(group, value) in groups" :key="group.count">
            {{ group.name }}({{ group.count }})
          </li>
        </ul>

        <ul class="filter-level clear">
          <li v-for="(level, value) in levels" :key="level.count">
            {{ level.name }}({{ level.count }})
          </li>
          <li class="filter-input">
            <input type="text" >
          </li>
        </ul>
      </div>

      <div class="display-screen">

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
                  { name : 'CPU平均值' , value : '32' , unit : 'MS' },
                  { name : '堆内存' , value : '5.2' , unit : 'MB' },
                  { name : '总内存' , value : '99.4' , unit : 'MB' },
                  { name : 'FPS' , value : '32' , unit : '/S' },
                  { name : '上行流量' , value : '123' , unit : 'KB' },
                  { name : '下行流量' , value : '273' , unit : 'KB' },
              ],
      groups:[
        { name : '全部' , count: '6' },
        { name : '路由模块' , count: '2' },
        { name : '计时器模块' , count: '1' },
        { name : '背包模块' , count: '0' },
        { name : '角色模块' , count: '3' }
      ],
      levels:[
        { name : '全部' , count: '6' },
        { name : '错误' , count: '0' },
        { name : '警告' , count: '0' },
        { name : '信息' , count: '6' },
      ]
    }
  }
}
</script>

<style scoped lang="stylus">
@import "../assets/stylus/_settings"

.console
  padding 0 $global-margin + 10px $global-margin $global-margin
  .monitor
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

  .console-display
    margin 0px 5px 10px 5px
    background-color $bg-color-v2
    width 100%
    .display-filter
      padding 10px
      .filter-group
        padding 10px 10px 0px 10px
      .filter-group,.filter-level
        li
          padding 0px 5px 5px 5px
          float left   
      .filter-level
        height 30px
        padding 10px 10px 0px 10px
        li
          padding 5px
        .filter-input
          float right
          input
            width 200px
            padding 5px 10px 5px 30px
            height 15px
            font-size 12px
            background-color $bg-color-v1
            border 0
            color $font-color
            background-image url('../assets/imgs/search.svg')
            background-repeat no-repeat
            background-size 7%
            background-position 5px
    .display-screen
      background-color $bg-color-v3
      min-height 400px
    
</style>