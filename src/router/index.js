import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView'
import PatientView from '../views/PatientView'
import DashboardView from '../views/DashboardView'
import UsersView from '../views/UsersView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/patients',
    name: 'patients',
    component: PatientView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView
  },
  {
    path: '/',
    name: 'home',
    component: DashboardView
    
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
