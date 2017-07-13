import Vue from 'vue'
import Store from '../store'

export default {
  getLog (clientId, onSuccess, onFaild) {
    Vue.http.get(Store.getters["env/url"] + "/debug/log/get-log/" + clientId).then(function(response){
      onSuccess(response)
    },function(response){
      onFaild(response)
    })
  }
}