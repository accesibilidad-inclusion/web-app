import { createRouter, createWebHistory } from 'vue-router'
import { useAppDataStore } from '@/stores/app-data'
import { useAppNavStore } from '@/stores/app-nav.js'
import SplashScreen from '../views/SplashScreen.vue'
import { nextTick } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'splash',
      component: SplashScreen
    },
    {
      path: '/inicio',
      name: 'home-screen',
      component: () => import('../views/HomeScreen.vue')
    },
    {
      path: '/tu-ubicacion',
      name: 'location-screen',
      component: () => import('../views/LocationScreen.vue')
    },
    {
      path: '/bienvenida',
      name: 'welcome-screen',
      component: () => import('../views/WelcomeScreen.vue'),
      meta: { title: 'Busca ayudas para realizar tareas', hideNav: true }
    },
    {
      path: '/:categorySlug/',
      name: 'category-screen',
      component: () => import('../views/CategoryScreen.vue'),
    },
    {
      path: '/:categorySlug/:serviceSlug/',
      name: 'service-screen',
      component: () => import('../views/ServiceScreen.vue'),
    },
    {
      path: '/:categorySlug/:serviceSlug/:venueSlug/',
      name: 'venue-screen',
      component: () => import('../views/VenueScreen.vue'),
    },
    {
      path: '/:categorySlug/:serviceSlug/:venueSlug/:taskSlug/',
      name: 'task-screen',
      component: () => import('../views/TaskScreen.vue'),
    },
  ]
})

router.beforeEach((to, from, next) => {
  window.speechSynthesis.cancel();

  const appData = useAppDataStore()
  const appNav = useAppNavStore()

  if (!appData.initialized && to.fullPath !== '/') {
    appNav.redirectTo = to.path
    next({ name: 'splash' })
  } else if (to.name === 'place-single' || to.name === 'task-single' || to.path.includes('/nueva-tarea') || to.path.includes('/evaluacion-lugar') || to.path.includes('/personal-information') || to.path.includes('/nuevo-apoyo')) {
    next();
  } else if (to.name !== 'welcome-onboarding' && to.name !== 'splash' && appNav.onboarding.welcome) {
    appNav.redirectTo = to.path
    next({ name: 'welcome-onboarding' })
  } else if ((to.name !== 'welcome-onboarding' && to.name !== 'splash' && !to.path.includes('/tu-ubicacion')) && !appData.location) {
    appNav.redirectTo = to.path
    next({ name: 'your-location' });
  } else {
    next();
  }
});

router.afterEach((to) => {
  if (to.meta !== undefined && to.meta.title) {
    const { title } = to.meta;
    nextTick(() => {
      document.title = `${title} | Pictos`;
    });
  }
});

export default router
