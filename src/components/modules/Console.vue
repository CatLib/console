<template>
    <div class="console-display">
        <div class="display-filter">
            <ul class="filter-level clear">
                <li v-for="(level, index) in levels" :key="level" @click="changeSelectLevel(index)" :class="{ 'selected': selectLevel == index }">
                {{ level.name }}<span v-if="level.count > 0">({{ level.count }})</span>
                </li>
                <li class="filter-input">
                  <input type="text" v-model="search">
                </li>
            </ul>
        </div>

        <div class="display-screen">
            <p v-if="levels[selectLevel].count <= 0" class="tip">暂时没有日志.</p>
            <ul>
                <li v-for="(output, index) in getLogs" v-if="output.level == selectLevel && isShow(output)" :key="output.message" @click="output.showStack = !output.showStack">
                    <div class="icon">
                        <img src="../../assets/imgs/info.svg">
                    </div>
                    <div class="message">
                        <p class="title">{{output.message}}</p>
                       
                        <p class="namespace">({{output.namespace}})</p>
        
                        <transition name="slide-fade">
                        <blockquote v-show="output.showStack">
                            <div v-if="output.callStack.length > 0">
                            <p v-for="(stack, value) in output.callStack" :key="stack.length">
                                {{stack}}
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
import debugLog from '../../api/debug.log'
export default {
  name: 'console_module',
  data () {
    return { search : "" }
  },
  methods:{
    changeSelectLevel(level){
      this.$store.commit("console/selectLevel",level)
    },
    isShow(log){

      if(this.search == ""){
        return true
      }

      // find with command
      var commandSplitIndex = this.search.indexOf(":")
      if(commandSplitIndex >= 0){
        var command = this.search.substring(0, commandSplitIndex)
        var val = this.search.substring(commandSplitIndex + 1, this.search.length)
        if(command == "ns"){
          if(log.namespace.toLowerCase().indexOf(val.toLowerCase()) != 0){
            return false
          }
          return true
        }
      }

      // find with message
      if(log.message.toLowerCase().indexOf(this.search.toLowerCase()) >= 0){
        return true
      }

      return false
    }
  },
  computed:{
    getLogs : function(){ return this.$store.getters["console/getLogs"] },
    levels : function(){ return this.$store.getters["console/getLevels"]},
    selectLevel : function(){ return this.$store.getters["console/getSelectLevel"]}
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
      .filter-level
        li
          padding 0px 5px 5px 5px
          float left
          cursor pointer
          user-select none
        li.selected
          color $bg-color-v7
        li:hover
          color $bg-color-v7
        height 30px
        padding 10px 10px 0px 10px
        .filter-input
          float right
          position relative
          top -5px
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
            p.namespace
              height 16px
              line-height 16px
              font-size 12px
              color $bg-color-v5
            blockquote
              padding 5px 0px 5px 0px
              p
                padding 0px
                padding-top 5px
                line-height 16px
                color $bg-color-v5
</style>