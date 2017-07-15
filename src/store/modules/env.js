import router from '../../router'
import Store from '../index'

var state = {
  host: null,
  port: null,
  clientId: 0,
  isConnect: false,
  num : 0
}

var getters = {
    authorizd(state){
      return state.host != "" &&
              state.host != null
    },
    url(state){
        return "http://" + state.host + ":" + state.port;
    },
    hostPort(state){
        return state.host + ":" + state.port;
    },
    isConnect(state){
        return state.isConnect
    },
    clientId(state){
        return state.clientId
    }
}

var mutations = {
    changeHost(state , payload){
        if(payload == null){
            state.host = null
            state.port = null
            state.isConnect = false
            router.push({ path:'/login' })
        }else{
            var result = payload.split(':')
            state.host = result[0];
            state.port = result.length > 1 ? result[1] : "9478"
            state.isConnect = true

            window.localStorage.setItem("baseUrl", state.host + ":" + state.port)
            Store.commit("console/clear")
            router.push({ path:'/' })
        }
    },
    reClientId(state){
        state.clientId = Math.floor(Math.random() * 65535);
    },
    changeConnectStatu(state, payload){
        state.isConnect = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}