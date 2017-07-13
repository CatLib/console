import debugLog from '../../api/debug.log'

var state = {
  console: [],
}

var getters = { }

var mutations = { 
    
}

var actions = {
    refresh(context){
        if(context.rootGetters["env/authorizd"])
        {
            debugLog.getLog(context.rootGetters["env/clientId"],(result)=>{
                console.info("hello action!")
            }, ()=>{})
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