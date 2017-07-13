import Vue from 'vue'
import Vuex from 'vuex'

export default {
  getLog (clientId, onSuccess, onFaild) {
    console.dir(Vuex)
    Vue.http.get(Vuex.getters["env/url"]).then(function(response){
      
    },function(response){
      //faild
    });
  }
}