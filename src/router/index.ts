import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import SearchResults from '../views/SearchResults.vue';
import CategoryArchive from '../views/CategoryArchive.vue';
import ServiceSingle from '../views/ServiceSingle.vue';
import PlaceSingle from '../views/PlaceSingle.vue';
import TaskSingle from '../views/TaskSingle.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/buscar/',
    name: 'search',
    component: SearchResults,
  },
  {
    path: '/categoria/:categorySlug/',
    name: 'category',
    component: CategoryArchive,
  },
  // @todo
  // {
  //   path: '/lugares/nuevo',
  //   name: 'place-create',
  //   component: PlacesNew,
  // },
  {
    path: '/servicios/:serviceId/',
    name: 'service-single',
    component: ServiceSingle,
  },
  {
    path: '/lugares/:placeId/',
    name: 'place-single',
    component: PlaceSingle,
  },
  {
    path: '/tareas/:taskId/',
    name: 'task-single',
    component: TaskSingle,
  },
  {
    path: '/acerca-de/',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
