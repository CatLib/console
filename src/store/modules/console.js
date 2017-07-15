import debugLog from '../../api/debug.log'

var state = {
  console: [],
  levels:{
        999 : { name : "全部" , count : 0 },
        0 : { name : "紧急" , count : 0 },
        1 : { name : "警报" , count : 0 },
        2 : { name : "关键" , count : 0 },
        3 : { name : "错误" , count : 0 },
        4 : { name : "警告" , count : 0 },
        5 : { name : "通知" , count : 0 },
        6 : { name : "信息" , count : 0 },
        7 : { name : "调试" , count : 0 }
      },
  selectLevel : 999,
  commandStack : [],
  commandCursor : 0
}

var getters = { 
    getLogs: (state) => state.console,
    getLevels: (state) => state.levels,
    getSelectLevel: (state) => state.selectLevel,
    getCursorCommand(state){
        if(state.commandStack == null){
            console.dir(123)
            return ""
        }
        if(state.commandCursor >= state.commandStack.length){
            return ""
        }
        return state.commandStack[state.commandCursor]
    }
}

var mutations = { 
    pushLog(state , response){
        for(var i = 0 ; i < response.data.Response.length; i++){
            state.console.push(response.data.Response[i])
            state.levels[response.data.Response[i].level].count++
            state.levels[999].count++
        }
    },
    selectLevel(state, payload){
        state.selectLevel = payload
    },
    clear(state){
        state.console = []
        for (var i in state.levels)
        {
            state.levels[i].count = 0
        }
    },
    loadCommandStack(state){
        try{
            state.commandStack = JSON.parse(window.localStorage.getItem("commandStack"))
        }catch(e){
            state.commandStack = []
        }
        state.commandCursor = 0
    },
    addCommand(state,command){
        if(state.commandStack == null){
            state.commandStack = []
        }
        var index = state.commandStack.indexOf(command);
        if (index > -1) {
            state.commandStack.splice(index, 1);
        }

        if(state.commandStack.length >= 50){
            state.commandStack.pop()
        }

        state.commandStack.unshift(command)
        state.commandCursor = 0
        window.localStorage.setItem("commandStack", JSON.stringify(state.commandStack))
    },
    next(state){
        if(state.commandStack == null){
            return
        }
        if(state.commandCursor + 1 < state.commandStack.length){
            state.commandCursor++
        }
    },
    prev(state){
        if(state.commandStack == null){
            return
        }
        if(state.commandCursor - 1 >= 0){
            state.commandCursor--
        }
    }
}

var actions = {
    refresh({rootGetters , commit }){
        if(rootGetters["env/authorizd"])
        {
            debugLog.getLog(rootGetters["env/clientId"],(response)=>{
                if(!rootGetters["env/isConnect"]){
                    commit('env/changeConnectStatu',true, { root: true } )
                }
                commit("pushLog", response);
            }, ()=>{ 
                if(rootGetters["env/isConnect"]){
                    commit('env/changeConnectStatu',false, { root: true } ) 
                }
            })
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}