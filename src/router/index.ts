import {createRouter, createWebHistory} from 'vue-router'
import {useAppDataStore} from '@/stores/app-data'
import {useAppNavStore} from '@/stores/app-nav.js'
import {nextTick} from 'vue'
import {defineAsyncComponent} from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'splash',
      component: import('../views/SplashScreen.vue')
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
      meta: {title: 'Busca ayudas para realizar tareas', hideNav: true}
    },
    {
      path: '/busqueda/',
      name: 'search-results-screen',
      component: defineAsyncComponent(() => import('../views/SearchResultsScreen.vue')),
      meta: {title: 'Resultados de tu búsqueda'}
    },
    {
      path: '/:categorySlug/',
      name: 'category-screen',
      component: defineAsyncComponent(() => import('../views/CategoryScreen.vue'))
    },
    {
      path: '/:categorySlug/:serviceSlug/',
      name: 'service-screen',
      component: defineAsyncComponent(() => import('../views/ServiceScreen.vue'))
    },
    {
      path: '/:categorySlug/:serviceSlug/:venueSlug/',
      name: 'venue-screen',
      component: defineAsyncComponent(() => import('../views/VenueScreen.vue'))
    },
    {
      path: '/:categorySlug/:serviceSlug/:venueSlug/:taskSlug/',
      name: 'task-screen',
      component: defineAsyncComponent(() => import('../views/TaskScreen.vue'))
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.speechSynthesis.cancel()

  const appData = useAppDataStore()
  const appNav = useAppNavStore()

  if (!appData.initialized && to.fullPath !== '/') {
    appNav.redirectTo = to.path
    next({name: 'splash'})
  } else if (
    to.name === 'venue-screen' ||
    to.name === 'task-screen' ||
    to.path.includes('/nueva-tarea') ||
    to.path.includes('/evaluacion-lugar') ||
    to.path.includes('/personal-information') ||
    to.path.includes('/nuevo-apoyo')
  ) {
    next()
  } else if (to.name !== 'welcome-screen' && to.name !== 'splash' && appNav.onboarding.welcome) {
    appNav.redirectTo = to.path
    next({name: 'welcome-screen'})
  } else if (
    to.name !== 'welcome-screen' &&
    to.name !== 'splash' &&
    !to.path.includes('/tu-ubicacion') &&
    !appData.location
  ) {
    appNav.redirectTo = to.path
    next({name: 'location-screen'})
  } else {
    next()
  }
})

router.afterEach((to) => {
  if (to.meta !== undefined && to.meta.title) {
    const {title} = to.meta
    nextTick(() => {
      document.title = `${title} | Pictos`
    })
  }
})

export default router
