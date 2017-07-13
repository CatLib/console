import debugLog from '../../api/debug.log'

var state = {
  console: [],
}

var getters = { }

var mutations = { 
    
}

var actions = {
    refresh({rootGetters , commit }){
        if(rootGetters["env/authorizd"])
        {
            debugLog.getLog(rootGetters["env/clientId"],(result)=>{
                if(!rootGetters["env/isConnect"]){
                    commit('env/changeConnectStatu',true, { root: true } )
                }
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