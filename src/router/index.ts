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
      meta: {title: 'Facilitamos tu vida en pasos simples', navbar: {logo: true, menu: true}}
    },
    {
      path: '/tu-ubicacion',
      name: 'location-screen',
      component: () => import('../views/LocationScreen.vue'),
      meta: {
        title: 'Configura tu ubicación geografica para resultados mas precisos',
        navbar: {logo: true, close: true}
      }
    },
    {
      path: '/bienvenida',
      name: 'welcome-screen',
      component: () => import('../views/WelcomeScreen.vue'),
      meta: {title: 'Busca ayudas para realizar tareas', navbar: {close: true}}
    },
    {
      path: '/busqueda/',
      name: 'search-results-screen',
      component: defineAsyncComponent(() => import('../views/SearchResultsScreen.vue')),
      meta: {title: 'Resultados de tu búsqueda', navbar: {logo: true, back: true, menu: true}}
    },
    {
      path: '/error',
      name: 'error-screen',
      component: () => import('../views/ErrorScreen.vue'),
      meta: {title: 'Ha ocurrido un error inesperado', navbar: {logo: true, menu: true}}
    },
    {
      path: '/acerca-de',
      name: 'about-screen',
      component: () => import('../views/AboutScreen.vue'),
      meta: {title: 'Acerca de Pictos', navbar: {logo: true, close: true}}
    },
    {
      path: '/colabora-con-nosotros',
      name: 'colaborate-screen',
      component: () => import('../views/ColaborateScreen.vue'),
      meta: {title: 'Colabora con nosotros', navbar: {logo: true, close: true}}
    },
    {
      path: '/aprende-a-evaluar/:type',
      name: 'onboarding-evaluation-screen',
      component: () => import('../views/OnboardingEvaluationScreen.vue'),
      meta: {title: 'Aprende a evaluar', navbar: {close: true}}
    },
    {
      path: '/informacion-personal',
      name: 'personal-information-screen',
      component: () => import('../views/PersonalInformationScreen.vue'),
      meta: {title: 'Completa tu información personal', navbar: {logo: true, close: true}}
    },
    {
      path: '/evaluar-lugar/:type/:id',
      name: 'evaluate-venue-screen',
      component: () => import('../views/EvaluateVenueScreen.vue'),
      meta: {title: 'Evalua este lugar', navbar: {logo: true, close: true}}
    },
    {
      path: '/aprende-a-sugerir-lugares/',
      name: 'onboarding-add-venue-screen',
      component: () => import('../views/OnboardingSuggestVenuesScreen.vue'),
      meta: {title: 'Aprende a sugerir lugares', navbar: {close: true}}
    },
    {
      path: '/sugerir-lugar/:service_id?',
      name: 'add-venue-screen',
      component: () => import('../views/SuggestVenueScreen.vue'),
      meta: {title: 'Sugiérenos un nuevo lugar', navbar: {logo: true, close: true}}
    },
    {
      path: '/aprende-a-agregar-tareas/',
      name: 'onboarding-new-task-screen',
      component: () => import('../views/OnboardingNewTaskScreen.vue'),
      meta: {title: 'Aprende a agregar nuevas tareas', navbar: {close: true}}
    },
    {
      path: '/agregar-tarea',
      name: 'new-task-screen',
      component: () => import('../views/NewTaskScreen.vue'),
      meta: {title: 'Agregar nueva tarea', navbar: {logo: true, close: true}}
    },
    {
      path: '/crear-pictogramas/:task_id',
      name: 'create-pictograms-screen',
      component: () => import('../views/CreatePictogramsScreen.vue'),
      meta: {title: 'Crear pictogramas a tarea', navbar: {logo: true, close: true}}
    },
    {
      path: '/:categorySlug/',
      name: 'category-screen',
      component: defineAsyncComponent(() => import('../views/CategoryScreen.vue')),
      meta: {navbar: {logo: true, back: true, menu: true}}
    },
    {
      path: '/:categorySlug/:serviceSlug/',
      name: 'service-screen',
      component: defineAsyncComponent(() => import('../views/ServiceScreen.vue')),
      meta: {navbar: {logo: true, back: true, menu: true}}
    },
    {
      path: '/:categorySlug/:serviceSlug/:venueSlug/',
      name: 'venue-screen',
      component: defineAsyncComponent(() => import('../views/VenueScreen.vue')),
      meta: {navbar: {logo: true, back: true, menu: true}}
    },
    {
      path: '/:categorySlug/:serviceSlug/:venueSlug/:taskSlug/',
      name: 'task-screen',
      component: defineAsyncComponent(() => import('../views/TaskScreen.vue')),
      meta: {navbar: {logo: true, close: true}}
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.speechSynthesis.cancel()

  const appData = useAppDataStore()
  const appNav = useAppNavStore()
  appNav.theme = 'presential'

  if (!appData.initialized && to.fullPath !== '/') {
    appNav.redirectTo = to.path
    next({name: 'splash'})
  } else if (
    to.name === 'venue-screen' ||
    to.name === 'task-screen' ||
    to.path.includes('/agregar-tarea') ||
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
    !appData.location.isGpsActivated() &&
    !appData.location.isCommuneSelected()
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
