import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Hub from './components/Hub.vue'
import Editor from './components/Editor.vue'
import Profile from './components/Profile.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Editor',
    component: Editor,
  },
  {
    path: '/hub',
    name: 'Hub',
    component: Hub,
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: Profile,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// router.beforeEach(function (to, from, next) {})

export default router
