import Vue from 'vue'
import i18n from 'vuex-i18n'
import store from '../store'
import en from './lang/en'
import zh from './lang/zh'

Vue.use(i18n.plugin, store)

Vue.i18n.add('en', en);
Vue.i18n.add('zh', zh);

var lang = window.localStorage.getItem("lang", lang);
Vue.i18n.set(lang!=null?lang:"zh")

Vue.filter('i18n', function(value){
    return Vue.i18n.translate(value)
});