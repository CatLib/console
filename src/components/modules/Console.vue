<template>
    <div class="console-display">
        <div class="display-filter">
            <ul class="filter-level clear">
                <li @click="changeSelectLevel(999)" :class="{ 'selected': selectLevel == 999 }">
                {{ levels[999].name }}<span v-if="levels[999].count > 0">({{ levels[999].count }})</span>
                </li>
                <li v-for="(level, index) in levels" v-if="index != 999" :key="level" @click="changeSelectLevel(index)" :class="{ 'selected': selectLevel == index }">
                {{ level.name }}<span v-if="level.count > 0">({{ level.count }})</span>
                </li>
                <li class="filter-input">
                  <input type="text" v-model="search">
                </li>
            </ul>
        </div>

        <div class="display-screen">
            <p v-if="levels[selectLevel].count <= 0" class="tip">暂时没有日志.</p>
            <ul id="console-box">
                <li v-for="(output, index) in getLogs" v-if="(selectLevel == 999 || output.level == selectLevel) && isShow(output)" :key="output.id" @click="output.showStack = !output.showStack">
                    <div class="icon">
                        <img :src="output.level | toImg"/>
                    </div>
                    <div class="message">
                        <p class="title" v-html="highlight(output.message,search)"></p>
                        <p class="namespace">{{ output.namespace }}</p>
        
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

        <div class="console-command">
          <input type="text" @keyup.enter="sendCommand" @keyup.38="commandNext" @keyup.40="commandPrev" v-model="command">
          <a href="#" @click="sendCommand">发送(Enter)</a>
        </div>
    </div>
</template>

<script>
import debugLog from '../../api/debug.log'
import webConsole from '../../api/web.console'
export default {
  name: 'console_module',
  data () {
    return { 
      search : "", 
      command: "",
      isWatch : true ,
      consoleBox : null,
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.consoleBox.scrollTop = this.consoleBox.scrollHeight;
    })
    this.consoleBox = document.getElementById('console-box')
    this.consoleBox.addEventListener("wheel", this.handleScroll);
  },
  filters:{
    toImg(value){
      return "/static/imgs/level_" + value + ".svg"
    }
  },
  methods:{
    changeSelectLevel(level){
      this.$store.commit("console/selectLevel",level)
    },
    handleScroll(){
      this.isWatch = this.consoleBox.scrollTop >= this.consoleBox.scrollHeight - 100 - 800;
    },
    highlight(value , search){
      if(search == ""){
        return value
      }

      var commandSplitIndex = search.indexOf(":")
      if(commandSplitIndex >= 0){
        return value
      }

      return value.replace(new RegExp(search,"gmi"), "<b style=\"color:rgb(244,100,95)\">" + search + "</b>")
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
          if(log.namespace.toLowerCase().indexOf(val.toLowerCase()) < 0){
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
    },
    sendCommand(){

      if(this.command.length <= 0){
        return
      }

      if(this.command[0] == "@"){
        if(this.command == "@clear"){
          this.$store.commit("console/clear")
        }
        this.command = ""
        return;
      }
      
      var splitIndex = this.command.indexOf("://");
      var scheme = "catlib"
      var path = this.command

      if(splitIndex != -1){
        scheme = this.command.substring(0, splitIndex);
        path = this.command.substring(splitIndex + 3, this.command.length);
      }
      
      this.$store.commit("console/addCommand" , this.command)
      this.command = "" 
      webConsole.sendCommand(scheme + "/" + path,function(response){
        //success
      },function(response){
        //faild
      });
      
    },
    commandNext(){
      this.command = this.$store.getters["console/getCursorCommand"]
      this.$store.commit("console/next")
    },
    commandPrev(){
      this.$store.commit("console/prev")
      this.command = this.$store.getters["console/getCursorCommand"]
    }
  },
  computed:{
    getLogs : function(){ return this.$store.getters["console/getLogs"] },
    levels : function(){ return this.$store.getters["console/getLevels"]},
    selectLevel : function(){ return this.$store.getters["console/getSelectLevel"]}
  },watch:{
    getLogs(){
      if(this.isWatch){
        this.$nextTick(() => {
          this.consoleBox.scrollTop = this.consoleBox.scrollHeight;
        })
      }
    }
  }
}
</script>
<style scoped>
ul::-webkit-scrollbar {
  width: 3px;
}
ul::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2); 
} 
</style>

<style scoped lang="stylus">
@import "../../assets/stylus/_settings"
  .console-display
    margin 0px 5px 10px 5px
    width 100%
    .display-filter
      padding 10px
      background-color $bg-color-v2
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
        max-height 600px
        overflow auto
        li:nth-child(even)
          background-color $bg-color-v3
        li
          padding 10px
          cursor pointer
          .icon
            position relative
            top 4px
            left 2px
            float left
            text-align center
            img
              width 26px
              height 26px
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
              .h
                color $bg-color-v7
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
    .console-command
      margin-top 10px
      background-color $bg-color-v4
      padding-left 10px
      height 40px
      input
        float left
        width 85%
        border 0px
        background-color $bg-color-v4
        height 100%
        color $bg-color-v6
      a
        text-align center
        line-height 40px
        float right
        display block
        background-color $bg-color-v7
        width 10%
        height 100%
      a:hover
        text-decoration none
        background-color $bg-color-v8
</style>