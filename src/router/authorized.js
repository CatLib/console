import router from '../router'
import store from '../store'

router.beforeEach((to, from ,next) => {
    if(to.matched.some( routed => routed.meta.auth)){
        if(store.getters["env/authorizd"]) {
            next()
        }else{
            next({ path:'/login', query:{ from: to.fullPath } })  
        }
    }else{
        next()
    }
})