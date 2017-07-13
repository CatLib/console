import router from '../../router'

var state = {
  host: null,
  port: null,
  clientId: 0
}

var getters = {
    authorizd(state){
      return state.host != "" &&
              state.host != null
    },
    url(state){
        return "http://" + state.host + ":" + state.port;
    }
}

var mutations = { 
    changeHost(state , payload){
        var result = payload.split(':')
        state.host = result[0];
        state.port = result.length > 1 ? result[1] : "9478"
        router.push({ path:'/' })
    },
    reClientId(state){
        state.clientId = Math.floor(Math.random() * 65535);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}