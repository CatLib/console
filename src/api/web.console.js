import Vue from 'vue'
import Store from '../store'

export default {
  sendCommand (command, onSuccess, onFaild) {
    Vue.http.get(Store.getters["env/url"] + "/" + command).then(function(response){
      onSuccess(response)
    },function(response){
      onFaild(response)
    })
  }
}