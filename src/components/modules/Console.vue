<template>
    <div class="console-display">
        <div class="display-filter">
            <ul class="filter-group clear">
                <li v-for="(group, index) in console.groups" :key="group.count" @click="current.selectGroup = index" :class="{ 'selected': current.selectGroup == index }">
                {{ group.name }}<span v-if="group.count > 0">({{ group.count }})</span>
                </li>
            </ul>

            <ul class="filter-level clear">
                <li v-for="(level, index) in console.groups[current.selectGroup].levels" :key="level.outputs.length" @click="current.selectLevel = index" :class="{ 'selected': current.selectLevel == index }">
                {{ level.name }}<span v-if="level.outputs.length > 0">({{ level.outputs.length }})</span>
                </li>
                <!--li class="filter-input">
                <input type="text" >
                </li!-->
            </ul>
        </div>

        <div class="display-screen">
            <p v-if="console.groups[current.selectGroup].levels[current.selectLevel].outputs.length <= 0" class="tip">暂时没有日志.</p>
            <ul v-else>
                <li v-for="(output, index) in console.groups[current.selectGroup].levels[current.selectLevel].outputs" :key="output.title" @click="output.showStack = !output.showStack">
                    <div class="icon">
                        <img src="../../assets/imgs/info.svg">
                    </div>
                    <div class="message">
                        <p class="title">{{output.title}}</p>
                        <transition name="slide-fade">
                        <blockquote v-show="output.showStack">
                            <div v-if="output.callStack.length > 0">
                            <p v-for="(stack, value) in output.callStack" :key="stack.length">
                                {{stack.code}}
                            </p>
                            </div>
                        </blockquote>
                        </transition>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  name: 'console_module',
  data () {
    return {
      current:{
        selectGroup : 0,
        selectLevel : 0,
        lastId : 0
      },
      console: {
        groups : {
          0 : { name : '未分组' , count: 6 , levels: {
                    0 : { name : '紧急' , outputs : [
                      { title : 'Hello world 1' , showStack : false , callStack : [ { code : "UnityEngine.Debug::Log(Object)"} ,  { code : "NewBehaviorScripts:Start() (at Assets/NewBehavior.cs:8)" } ] },
                      { title : 'Hello world 1' , showStack : false , callStack : [ { code : "UnityEngine.Debug::Log(Object)"} ,  { code : "NewBehaviorScripts:Start() (at Assets/NewBehavior.cs:8)" } ] }
                    ]},
                    1 : { name : '警报' , outputs : []},
                    2 : { name : '关键' , outputs : []},
                    3 : { name : '错误' , outputs : []},
                    4 : { name : '警告' , outputs : []},
                    5 : { name : '通知' , outputs : []},
                    6 : { name : '信息' , outputs : []},
                    7 : { name : '调试' , outputs : []},
                  } 
          },
          1 : { name : '路由模块' , count: 2 , levels: {
                    0 : { name : '紧急' , outputs : [] },
                    1 : { name : '警报' , outputs : []},
                    2 : { name : '关键' , outputs : []},
                    3 : { name : '错误' , outputs : []},
                    4 : { name : '警告' , outputs : []},
                    5 : { name : '通知' , outputs : []},
                    6 : { name : '信息' , outputs : []},
                    7 : { name : '调试' , outputs : []},
                  } },
          2 : { name : '计时器模块' , count: 1 , levels: {
                    0 : { name : '紧急' , outputs : [] },
                    1 : { name : '警报' , outputs : []},
                    2 : { name : '关键' , outputs : []},
                    3 : { name : '错误' , outputs : []},
                    4 : { name : '警告' , outputs : []},
                    5 : { name : '通知' , outputs : []},
                    6 : { name : '信息' , outputs : []},
                    7 : { name : '调试' , outputs : []},
                  }},
          3 : { name : '背包模块' , count: 0 , levels: {
                    0 : { name : '紧急' , outputs : [] },
                    1 : { name : '警报' , outputs : []},
                    2 : { name : '关键' , outputs : []},
                    3 : { name : '错误' , outputs : []},
                    4 : { name : '警告' , outputs : []},
                    5 : { name : '通知' , outputs : []},
                    6 : { name : '信息' , outputs : []},
                    7 : { name : '调试' , outputs : []},
                  }},
          4 : { name : '角色模块' , count: 3 , levels: {
                    0 : { name : '紧急' , outputs : [] },
                    1 : { name : '警报' , outputs : []},
                    2 : { name : '关键' , outputs : []},
                    3 : { name : '错误' , outputs : []},
                    4 : { name : '警告' , outputs : []},
                    5 : { name : '通知' , outputs : []},
                    6 : { name : '信息' , outputs : []},
                    7 : { name : '调试' , outputs : []},
                  }},
        },
      }
    }
  }
}
</script>


<style scoped lang="stylus">
@import "../../assets/stylus/_settings"
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
          cursor pointer
          user-select none
        li.selected
          color $bg-color-v7
        li:hover
          color $bg-color-v7
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
            height 20px
            font-size 12px
            background-color $bg-color-v1
            border 0
            color $bg-color-v6
            background-image url('../../assets/imgs/search.svg')
            background-repeat no-repeat
            background-size 7%
            background-position 5px
    .display-screen
      background-color $bg-color-v4
      min-height 400px
      .tip
        height 80px
        line-height 80px
        text-align center
      ul
        li:nth-child(even)
          background-color $bg-color-v3
        li
          padding 10px
          cursor pointer
          .icon
            float left
            text-align center
            img
              width 32px
              height 32px
          .slide-fade-enter-active
            transition all .3s ease
          .slide-fade-leave-active
            transition all .3s ease
          .slide-fade-enter, .slide-fade-leave-active
            transform translateX(10px)
            opacity: 0;
          .message
            margin-left 40px
            min-height 32px
            line-height 32px
            p.title
              font-size 13px
            blockquote
              padding 5px 0px 5px 0px
              p
                padding 0px
                line-height 16px
                color $bg-color-v5
</style>