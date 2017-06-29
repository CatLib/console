import Vue from 'vue'
import Router from 'vue-router'
import Console from '@/components/Console'
import Log from '@/components/Log'
import Monitor from '@/components/Monitor'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/console'
    },
    {
      path: '/console',
      name: 'Console',
      component: Console,
      meta:{ auth: true }
    },
    {
      path: '/log',
      name: 'log',
      component: Log,
      meta:{ auth: true }
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: Monitor,
      meta:{ auth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
  ]
})

require('./authorized')