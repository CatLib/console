import Vue from 'vue'
import i18n from 'vuex-i18n'
import store from '../store'
import en from './lang/en'
import zh_CN from './lang/zh-CN'

Vue.use(i18n.plugin, store)

Vue.i18n.add('en', en);
Vue.i18n.add('zh-CN', zh_CN);

Vue.i18n.set('zh-CN')

Vue.filter('i18n', function(value){
    return Vue.i18n.translate(value)
});