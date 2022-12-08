import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { // HOME NAVIGATION
      path: '/',
      name: 'home',
      meta:{
        title:"Home"
      },
      component: () => import("../views/Home.vue")
    },
    { // COMMUNICATION
      path: '/communication',
      name: 'communication',
      meta:{
        title:"Communication"
      },
      component: () => import("../views/Communication.vue")
    },
    { // ADVANCE TABLE NAVIGATION
      path: '/advance-table',
      name: 'advanceTable',
      meta:{
        title:"Advance Table"
      },
      component: () => import("../views/AdvanceTable.vue")
    },
    { // DYNAMIC FORM NAVIGATION
      path: '/dynamic-form',
      name: 'dynamicForm',
      meta:{
        title:"Dynamic Form"
      },
      component: () => import("../views/DynamicForm.vue")
    },

  ]
})

export default router
