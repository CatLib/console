import router from '../../router'

var state = {
  host: []
}

var getters = {
    authorizd(state){
      return state.host != "" &&
              state.host != null
    }
}

var mutations = { 
    changeHost(state , payload){
        state.host = payload
        router.push({ path:'/' })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}