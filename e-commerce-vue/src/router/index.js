import Vue from 'vue'
import VueRouter from 'vue-router'

/*
 * Configuration du Vue router
 * Indique quel component utiliser pour chaque route
 */

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    component: () => import('../components/Home.vue')
  },



  {
    path: '/connexion',
    component: () => import('../components/Connexion.vue'),
    name: 'connexion'
  },
  {
    path: '/inscription',
    component: () => import('../components/Inscription.vue'),
    name: 'inscription'
  },
  {
    path: '/articles',
    component: () => import('../components/ArticlesList.vue'),
    name: 'articles'
  },
  {
    path: '/sneakers',
    component: () => import('../components/Sneakers.vue'),
    name: 'sneakers'
  },
  {
    path: '/streetwear',
    component: () => import('../components/Streetwear.vue'),
    name: 'streetwear'
  },
  {
    path: '/vendre',
    component: () => import('../components/Vendre.vue'),
    name: 'vendre'
  },

  {
    path: '/panier',
    component: () => import('../components/Panier.vue'),
    name: 'panier'
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../components/About.vue')
  },
  {
    path: '/article/:id',
    component: () => import('../components/ArticleSingle.vue'),
    name: 'articleSingle'
  }
  ,



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
