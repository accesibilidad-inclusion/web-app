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
      component: () => import('../views/SplashScreen.vue')
    },
    {
      path: '/inicio',
      name: 'home-screen',
      component: () => import('../views/HomeScreen.vue'),
      meta: {title: 'Facilitamos tu vida en pasos simples'}
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
      path: '/error',
      name: 'error-screen',
      component: () => import('../views/ErrorScreen.vue'),
      meta: {title: 'Ha ocurrido un error inesperado'}
    },
    {
      path: '/acerca-de',
      name: 'about-screen',
      component: () => import('../views/AboutScreen.vue'),
      meta: {title: 'Acerca de Pictos'}
    },
    {
      path: '/colabora-con-nosotros',
      name: 'colaborate-screen',
      component: () => import('../views/ColaborateScreen.vue'),
      meta: {title: 'Colabora con nosotros'}
    },
    {
      path: '/evaluar-lugar/:type/:id',
      name: 'evaluate-venue-screen',
      component: () => import('../views/EvaluateVenueScreen.vue'),
      meta: {title: 'Evalua este lugar'}
    },
    {
      path: '/aprende-a-evaluar/:type',
      name: 'onboarding-evaluation-screen',
      component: () => import('../views/OnboardingEvaluationScreen.vue'),
      meta: {title: 'Aprende a evaluar', hideNav: true}
    },
    {
      path: '/informacion-personal',
      name: 'personal-information-screen',
      component: () => import('../views/PersonalInformationScreen.vue'),
      meta: {title: 'Completa tu información personal', hideNav: true}
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
    },
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
    (!appData.location.isGpsActivated() && !appData.location.isCommuneSelected())
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
