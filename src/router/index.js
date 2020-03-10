import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '../components/pages/MainPage.vue';
import CatalogPage from '../components/pages/CatalogPage.vue';
import ProductPage from '../components/pages/ProductPage.vue';
import CartPage from '../components/pages/CartPage.vue';
import CheckoutPage from '../components/pages/CheckoutPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/catalog',
    name: 'CatalogPage',
    component: CatalogPage,
  },
  {
    path: '/product/:id',
    name: 'ProductPage',
    component: ProductPage,
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage,
  },
  {
    path: '/checkout',
    name: 'CheckoutPage',
    component: CheckoutPage,
  },
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
