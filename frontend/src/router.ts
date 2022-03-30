import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Hub from './components/Hub.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'ASD',
    component: Hub,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// router.beforeEach(function (to, from, next) {})

export default router
