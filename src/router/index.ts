import Vue from 'vue';
import VueRouter from 'vue-router';
// On Boarding
import Splash from '../views/Splash.vue';
import Welcome from '../views/onboarding/Welcome.vue';
import Permissions from '../views/onboarding/Permissions.vue';
import Registration from '../views/onboarding/Registration.vue';
import Birthday from '../views/onboarding/Birthday.vue';
import Sex from '../views/onboarding/Sex.vue';
import Disability from '../views/onboarding/Disability.vue';
import DisabilityDetails from '../views/onboarding/DisabilityDetails.vue';
import Complete from '../views/onboarding/Complete.vue';

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
    name: 'splash',
    component: Splash,
  },
  {
    path: '/onboarding/welcome',
    name: 'onboarding-welcome',
    component: Welcome,
  },
  {
    path: '/onboarding/permissions',
    name: 'onboarding-permissions',
    component: Permissions,
  },
  {
    path: '/onboarding/registration',
    name: 'onboarding-registration',
    component: Registration,
  },
  {
    path: '/onboarding/birthday',
    name: 'onboarding-birthday',
    component: Birthday,
  },
  {
    path: '/onboarding/sex',
    name: 'onboarding-sex',
    component: Sex,
  },
  {
    path: '/onboarding/disability',
    name: 'onboarding-disability',
    component: Disability,
  },
  {
    path: '/onboarding/disability-details',
    name: 'onboarding-disability-details',
    component: DisabilityDetails,
  },
  {
    path: '/onboarding/complete',
    name: 'onboarding-complete',
    component: Complete,
  },
  {
    path: '/home',
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
