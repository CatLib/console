import router from '../../router'
import Store from '../index'

var state = {
  host: null,
  port: null,
  clientId: 0,
  isConnect: false,
  isCheckGuid : false,
  guid : "",
  msg : null
}

var getters = {
    authorizd(state){
      return state.host != "" &&
              state.host != null
    },
    url(state){
        return "http://" + state.host + ":" + state.port
    },
    hostPort(state){
        return state.host + ":" + state.port
    },
    isConnect(state){
        return state.isConnect
    },
    isCheckGuid(state){
        return state.isCheckGuid
    },
    clientId(state){
        return state.clientId
    },
    msg(state){
        return state.msg
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
    showMsg(state,payload){
        state.msg = payload
    },
    hiddenMsg(state,payload){
        if(state.msg == null){
            return
        }
        if(payload != state.msg.id){
            return
        }
        state.msg = null
    },
    reClientId(state){
        state.clientId = Math.floor(Math.random() * 65535);
    },
    changeGuid(state,payload){
        state.isCheckGuid = true
        state.guid = payload
    },
    changeConnectStatu(state, payload){
        state.isConnect = payload;
        if(!state.isConnect){
            state.isCheckGuid = false
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
}