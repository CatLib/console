import router from '../../router'

var state = {
  host: null,
  port: null
}

var getters = {
    authorizd(state){
      return state.host != "" &&
              state.host != null
    }
}

var mutations = { 
    changeHost(state , payload){
        var result = payload.split(':')
        state.host = result[0];
        state.port = result.length > 1 ? result[1] : "7878"
        router.push({ path:'/' })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}