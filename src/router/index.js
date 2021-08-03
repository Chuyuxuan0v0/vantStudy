import { hasOwnMetadata } from 'core-js/fn/reflect'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{
    path: '/home',
    name: 'Home',
    component:Home,
    redirect :'/welcome',
    //这里加一个子路由，表示在当前路由下的路由
    children: [
      {path:'/welcome',component: Welcome }, 
      {path: '/users', component: Users},
      {path: '/rights', component: Rights},
      {path: '/roles',component: () => import(/* webpackChunkName: "about" */ '../components/power/Roles.vue')},
      {path: '/categories',component: () => import(/* webpackChunkName: "about" */ '../components/goods/Categories.vue')},
      {path: '/params',component: () => import(/* webpackChunkName: "about" */ '../components/goods/Params.vue')},
    ]
  },
]

const router = new VueRouter({
  routes
})



//挂载一个路由导航守卫
router.beforeEach((to, from, next) => {
  const tokenStr = window.sessionStorage.getItem('token');
  /*to 将要访问的路径
  from 代表从哪个路径跳转而来
  next 表示放行函数 语法： next()  or  next('/login') 强制跳转
  */
  //通过判断token是否登录，不过这个还是有bug，用户可以伪造token

  if (tokenStr) {
    console.log("tokenStr不为空，为：", tokenStr);
    return next();
  }
  else {

    console.log("tokenStr为空");

    //如果是登录页面路径，就直接next()
    if (to.path === '/login') {
      return next();
    } else {
      return next('/login');
    }
  }
});

export default router
