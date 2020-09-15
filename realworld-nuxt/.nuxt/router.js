import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _03b2be49 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _0d0cf3be = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _d66c672c = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _62af2a6a = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _f71398fc = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _103836e8 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _49796db7 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _03b2be49,
    children: [{
      path: "",
      component: _0d0cf3be,
      name: "home"
    }, {
      path: "login",
      component: _d66c672c,
      name: "login"
    }, {
      path: "register",
      component: _d66c672c,
      name: "register"
    }, {
      path: "profile/:username",
      component: _62af2a6a,
      name: "profile"
    }, {
      path: "settings",
      component: _f71398fc,
      name: "settings"
    }, {
      path: "editor",
      component: _103836e8,
      name: "editor"
    }, {
      path: "article/:slug",
      component: _49796db7,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
