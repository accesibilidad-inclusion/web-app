import {createRouter, createWebHistory} from 'vue-router'
import {useAppDataStore} from '@/stores/app-data'
import {useAppNavStore} from '@/stores/app-nav.js'
import {nextTick} from 'vue'
import {defineAsyncComponent} from 'vue'
import {useI18n} from 'vue-i18n'

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
      meta: {title: 'titles.home', navbar: {logo: true, menu: true}}
    },
    {
      path: '/tu-ubicacion',
      name: 'location-screen',
      component: () => import('../views/LocationScreen.vue'),
      meta: {
        title: 'titles.yourLocation',
        navbar: {logo: true, close: true}
      }
    },
    {
      path: '/bienvenida',
      name: 'welcome-screen',
      component: () => import('../views/WelcomeScreen.vue'),
      meta: {title: 'titles.welcome', navbar: {close: true}}
    },
    {
      path: '/busqueda/',
      name: 'search-results-screen',
      component: defineAsyncComponent(() => import('../views/SearchResultsScreen.vue')),
      meta: {title: 'titles.searchResults', navbar: {logo: true, back: true, menu: true}}
    },
    {
      path: '/error',
      name: 'error-screen',
      component: () => import('../views/ErrorScreen.vue'),
      meta: {title: 'titles.error', navbar: {logo: true, menu: true}}
    },
    {
      path: '/acerca-de',
      name: 'about-screen',
      component: () => import('../views/AboutScreen.vue'),
      meta: {title: 'titles.about', navbar: {logo: true, close: true}}
    },
    {
      path: '/colabora-con-nosotros',
      name: 'colaborate-screen',
      component: () => import('../views/ColaborateScreen.vue'),
      meta: {title: 'titles.colaborate', navbar: {logo: true, close: true}}
    },
    {
      path: '/instala-pictos',
      name: 'install-pictos-screen',
      component: () => import('../views/OnboardingInstallPictosScreen.vue'),
      meta: {title: 'titles.installPictos', navbar: {logo: true, close: true}}
    },
    {
      path: '/aprende-a-evaluar/:type',
      name: 'onboarding-evaluation-screen',
      component: () => import('../views/OnboardingEvaluationScreen.vue'),
      meta: {title: 'titles.onboardingEvaluation', navbar: {close: true}}
    },
    {
      path: '/informacion-personal',
      name: 'personal-information-screen',
      component: () => import('../views/PersonalInformationScreen.vue'),
      meta: {title: 'titles.personalInformation', navbar: {logo: true, close: true}}
    },
    {
      path: '/evaluar-lugar/:type/:id',
      name: 'evaluate-venue-screen',
      component: () => import('../views/EvaluateVenueScreen.vue'),
      meta: {title: 'titles.evaluateVenue', navbar: {logo: true, close: true}}
    },
    {
      path: '/definir-evaluacion/:score',
      name: 'define-evaluation-screen',
      component: () => import('../views/DefineEvaluationScreen.vue'),
      meta: {title: 'titles.defineEvaluation', navbar: {logo: true, close: true}}
    },
    {
      path: '/aprende-a-sugerir-lugares/',
      name: 'onboarding-add-venue-screen',
      component: () => import('../views/OnboardingSuggestVenuesScreen.vue'),
      meta: {title: 'titles.onboardingAddVenue', navbar: {close: true}}
    },
    {
      path: '/sugerir-lugar/:service_id?',
      name: 'add-venue-screen',
      component: () => import('../views/SuggestVenueScreen.vue'),
      meta: {title: 'titles.addVenue', navbar: {logo: true, close: true}}
    },
    {
      path: '/aprende-a-agregar-tareas/',
      name: 'onboarding-new-task-screen',
      component: () => import('../views/OnboardingNewTaskScreen.vue'),
      meta: {title: 'titles.onboardingNewTask', navbar: {close: true}}
    },
    {
      path: '/agregar-tarea',
      name: 'new-task-screen',
      component: () => import('../views/NewTaskScreen.vue'),
      meta: {title: 'titles.newTask', navbar: {logo: true, close: true}}
    },
    {
      path: '/crear-pictogramas/:task_id',
      name: 'create-pictograms-screen',
      component: () => import('../views/CreatePictogramsScreen.vue'),
      meta: {title: 'titles.createPictograms', navbar: {logo: true, close: true}}
    },
    {
      path: '/esperando-ayuda',
      name: 'waiting-help',
      component: () => import('../views/WaitingHelp.vue'),
      meta: {title: 'titles.waitingHelp', navbar: {logo: true, centered: true}}
    },
    {
      path: '/ayuda-disponible',
      name: 'help-available',
      component: () => import('../views/HelpAvailable.vue'),
      meta: {title: 'titles.helpAvailable', navbar: {logo: true, centered: true}}
    },
    {
      path: '/sin-ayuda-disponible',
      name: 'no-help-available',
      component: () => import('../views/NoHelpAvailable.vue'),
      meta: { title: 'titles.withoutHelpAvailable', navbar: {logo: true, centered: true} }
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
    to.name === 'no-help-available' ||
    to.path.includes('/agregar-tarea') ||
    to.path.includes('/aprender-a-agregar-tareas') ||
    to.path.includes('/evaluar-lugar') ||
    to.path.includes('/aprende-a-evaluar') ||
    to.path.includes('/informacion-personal') ||
    to.path.includes('/crear-pictogramas')
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

export default router
