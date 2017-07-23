<template>
  <div class="monitor-list clear">
    <div class="input clear">
        <input type="text" v-model="search">
    </div>
    <div v-if="monitorList.length <= 0" v-html="loadingMessage" class="loading"></div>
    <div v-for="(tags,index) in monitorList" :key="index" class="monitor-tag">
        <div class="tag">
            <p :title="tags.tag">{{tags.tag|i18n}}</p>
        </div>
        <ul class="clear">
            <li v-for="(monitor,monitorIndex) in tags.data" :key="monitorIndex" class="block">
                <div class="padding clear">
                    <p :title="monitor.name" v-html="highlight($t(monitor.name),search)"></p>
                    <p v-if="/\[.+?\]\(.+?\)/i.test(monitor.value)">
                        <a class="link" @click.stop="linkCommand(/\((.+?)\)/i.exec(monitor.value)[1])">
                            {{ /\[(.+?)\]/i.exec(monitor.value)[1]|i18n }}
                        </a>
                    </p>
                    <p v-else>{{monitor.value|i18n}}<span>{{monitor.unit|i18n}}</span></p>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import debugMonitor from '../../api/debug.monitor'
import webConsole from '../../api/web.console'
export default {
  name: 'monitor_module',
  props:['monitorMaxNum'],
  data () { 
    return {
      monitors: [],
      timer :null,
      search : "", 
      sendHandler : null
    }
  },
  methods:{
    refreshMonitor(){
      var vueComponent = this;
      debugMonitor.getMonitors(function(response){
        vueComponent.monitors = response.data.Response;
      },function(response){
        //faild
      });
    },
    isSpecialField : function(value){
        return /\(.+?\)\[.+?\]/i.test(value)
    },
    linkCommand(value){
        value = value.replace("://" , "/")
        var vueComponent = this
        var sendMsg = function(msg){
            if(vueComponent.sendHandler != null){
                clearInterval(vueComponent.sendHandler)
            }
            vueComponent.$store.commit("env/showMsg" , { "msg" : msg , "id" : "monitor.link.command"})
            vueComponent.sendHandler = setTimeout(function(){
                vueComponent.$store.commit("env/hiddenMsg" , "monitor.link.command")
            },1000);
        }
        webConsole.sendCommand(value, function(){
            sendMsg("msg.send.complete")
        },function(){
            sendMsg("msg.send.faild")
        })
    },
    highlight(value , inputSearch){
      if(inputSearch == ""){
        return value
      }

      var keywords = [];
      var searchArr = inputSearch.split(";")
      for(var n in searchArr){
        var search = searchArr[n]
        if(search == ""){
            continue
        }
        var commandSplitIndex = search.indexOf("@")
        if(commandSplitIndex >= 0){
            continue
        }

        keywords.push(search)
      }

      var regex = "(" + keywords.join("|") + ")"
      return value.replace(new RegExp(regex,"gmi"),function(key){
          return "<b style=\"color:rgb(244,100,95)\">" + key + "</b>"
      })
    },
    isMatchSearch:function(monitor,inputSearch,tag){
        if(inputSearch == ""){
            return true
        }
        var searchArr = inputSearch.split(";")
        for(var n in searchArr){
            var search = searchArr[n]
            if(search == ""){
                continue
            }
            var commandSplitIndex = search.indexOf("@")
            if(commandSplitIndex >= 0){
                var command = search.substring(0, commandSplitIndex)
                var val = search.substring(commandSplitIndex + 1, search.length)
                if(command == "tag"){
                    if(tag.toLowerCase().indexOf(val.toLowerCase()) >= 0
                        || this.$t(tag).toLowerCase().indexOf(val.toLowerCase()) >= 0){
                        return true
                    }
                }
            }else{
                if(monitor.name.toLowerCase().indexOf(search.toLowerCase()) >= 0 || 
                    this.$t(monitor.name).toLowerCase().indexOf(search.toLowerCase()) >= 0){
                    return true
                }
            }
        }   
        return false
    }
  },
  computed: {
    loadingMessage:function(){
        if(this.search != ""){
            return this.$t("ui.notfind" , { "keyword" : this.search })
        }

        if(!this.$store.getters["env/isConnect"]){
            return this.$t("ui.notconnect")
        }
        
        return this.$t("ui.loading")
    },
    monitorList : function(){
        var output = [];
        for (var i in this.monitors){

            var tag = this.monitors[i].tags.length > 0 ? this.monitors[i].tags[0] : 'tags.undefiend'

            if(!this.isMatchSearch(this.monitors[i], this.search , tag)){
                continue;
            }

            var finder = function(arr , find){
                for(var n in arr){
                    if(arr[n].tag == find){
                        return n
                    }
                }
                return -1
            }
            
            var tagGroup = finder(output,tag)
            
            if(tagGroup == -1){
                output.push({"tag" : tag , "data" : []})
                tagGroup = output.length - 1
            }
            output[tagGroup].data.push(this.monitors[i])
        }
        return output
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
    .input
        padding-bottom 10px
        input
            padding 10px 10px 10px 30px
            border 0px
            height 35px
            width 100%
            box-sizing: border-box;
            color $bg-color-v6
            background-color $bg-color-v2
            background-image url('../../assets/imgs/search.svg')
            background-repeat no-repeat
            background-size 18px
            background-position 5px
    .loading
        padding 15px
        text-align center
        background-color  $bg-color-v2
    .monitor-tag
        margin-bottom 20px
        background $bg-color-v4
        .tag
            padding 20px
            background $bg-color-v2
        .block:nth-child(even)
            background-color $bg-color-v3
        /*
        .block:nth-child(4n-1)
            background-color $bg-color-v3
        .block:nth-child(4n-4)
            background-color $bg-color-v3*/
        .block
            width 100%
            //width 50%
            float left
            .padding
                padding 15px 20px 15px 20px
                p
                    width 50%;
                    float left
                    .link
                        padding 5px
                        background-color $bg-color-v7
                        border-radius 3px
                        cursor pointer
                span
                    color $bg-color-v5
                    padding-left 5px
      
</style>