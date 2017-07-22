import Vue from 'vue'
import Store from '../store'

export default {
  getMonitorsIndex(onSuccess, onFaild) {
    Vue.http.get(Store.getters["env/url"] + "/debug/monitor/get-monitors-index", {timeout : 1000}).then(function(response){
      onSuccess(response)
    },function(response){
      onFaild(response)
    })
  },
  getMonitors(onSuccess, onFaild) {
    Vue.http.get(Store.getters["env/url"] + "/debug/monitor/get-monitors", {timeout : 1000}).then(function(response){
      onSuccess(response)
    },function(response){
      onFaild(response)
    })
  }
}