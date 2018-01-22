// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import Notifications from 'vue-notification';
import VueCookie from 'vue-cookie';


//----------------------CSS__INCLUDES------------
import '../static/css/MaterialIcons.css';



Vue.use(VueCookie);
Vue.use(Notifications);
Vue.use(Vuetify)
Vue.config.productionTip = false
router.beforeEach((route, redirect, next) => {

  function handleAuth(token) {

    if (token != null && token != '')
      return next();
    else
      return next('/sign-in');
  }
  if (route.matched.some(record => record.meta.auth)) {
    router.app.$cookie.set('moks','bla');
    var token = router.app.$cookie.get('moks');
  
    console.log('token', token);
    return handleAuth(token);
  } else {
    return next();
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
