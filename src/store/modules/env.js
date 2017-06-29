import router from '../../router'
import { mapGetters } from 'vuex'

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
        //router.go({name: '/' });
    }
}

export default {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    computed: mapGetters({authorizd : "authorizd"})
}