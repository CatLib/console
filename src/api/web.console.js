import Vue from 'vue'
import Store from '../store'

export default {
  sendCommand (command, onSuccess, onFaild) {
    Vue.http.get(Store.getters["env/url"] + "/" + command, {timeout : 1000}).then(function(response){
      onSuccess(response)
    },function(response){
      onFaild(response)
    })
  },
  getGuid(onSuccess,onFaild){
    Vue.http.get(Store.getters["env/url"] + "/debug/http-debugger-console/get-guid", {timeout : 1000}).then(function(response){
      onSuccess(response)
    },function(response){
      onFaild(response)
    })
  }
}