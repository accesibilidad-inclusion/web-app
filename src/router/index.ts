import Vue from 'vue';
import VueRouter from 'vue-router';
// On Boarding
import Splash from '../views/Splash.vue';
import YourLocation from '../views/YourLocation.vue';
import Onboarding from '../views/onboarding/Welcome.vue';
import OnboardingAbout from '../views/onboarding/About.vue';
import OnboardingHowItWorks from '../views/onboarding/HowItWorks.vue';
import OnboardingHelpUs from '../views/onboarding/HelpUs.vue';
import Permissions from '../views/onboarding/Permissions.vue';

import Registration from '../views/personal-information/Registration.vue';
import Birthday from '../views/personal-information/Birthday.vue';
import Gender from '../views/personal-information/Gender.vue';
import Disability from '../views/personal-information/Disability.vue';
import DisabilityDetails from '../views/personal-information/DisabilityDetails.vue';
import Complete from '../views/personal-information/Complete.vue';

import Home from '../views/Home.vue';
import SearchResults from '../views/SearchResults.vue';
import CategoryArchive from '../views/CategoryArchive.vue';
import ServiceSingle from '../views/ServiceSingle.vue';
import PlaceSingle from '../views/PlaceSingle.vue';
import PlaceScore from '../views/PlaceScore.vue';
import TaskSingle from '../views/TaskSingle.vue';

import NewPlace from '../views/NewPlace.vue';
import NewPlaceComplete from '../views/NewPlaceComplete.vue';
import NewPlaceIntro from '../views/NewPlaceIntro.vue';
import NewPlaceIntro2 from '../views/NewPlaceIntro2.vue';
import NewPlaceIntro3 from '../views/NewPlaceIntro3.vue';

import NewTaskIntro from '../views/NewTaskIntro.vue';
import NewTaskIntro2 from '../views/NewTaskIntro2.vue';
import NewTaskIntro3 from '../views/NewTaskIntro3.vue';
import NewTaskIntro4 from '../views/NewTaskIntro4.vue';
import NewTaskIntro5 from '../views/NewTaskIntro5.vue';
import NewTask from '../views/NewTask.vue';

import AddTasksIntro from '../views/AddTasksIntro.vue';
import AddTasksIntro2 from '../views/AddTasksIntro2.vue';
import AddTasksIntro3 from '../views/AddTasksIntro3.vue';
import AddTasksIntro4 from '../views/AddTasksIntro4.vue';
import AddTasksIntro5 from '../views/AddTasksIntro5.vue';

import PlaceEvaluation from '../views/PlaceEvaluation.vue';
import PlaceEvaluationConfirmation from '../views/PlaceEvaluationConfirmation.vue';
import PlaceEvaluationComplete from '../views/PlaceEvaluationComplete.vue';
import PlaceEvaluationIntro from '../views/PlaceEvaluationIntro.vue';
import PlaceEvaluationIntro2 from '../views/PlaceEvaluationIntro2.vue';
import PlaceEvaluationIntro3 from '../views/PlaceEvaluationIntro3.vue';
import PlaceEvaluationIntro4 from '../views/PlaceEvaluationIntro4.vue';

import NewAidIntro from '../views/NewAidIntro.vue';
import NewAidIntro2 from '../views/NewAidIntro2.vue';
import NewAidIntro3 from '../views/NewAidIntro3.vue';
import NewAidIntro4 from '../views/NewAidIntro4.vue';
import NewAidStep from '../views/NewAidStep.vue';
import NewAidSummary from '../views/NewAidSummary.vue';
import NewAidStepConfirmation from '../views/NewAidStepConfirmation.vue';
import NewAidComplete from '../views/NewAidComplete.vue';

import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'splash',
    component: Splash,
  },
  {
    path: '/tu-ubicacion',
    name: 'your-location',
    component: YourLocation,
    meta: { title: 'Tu ubicación' },
  },
  {
    path: '/onboarding/',
    name: 'onboarding',
    component: Onboarding,
    meta: { title: 'Busca ayudas para realizar tareas' },
  },
  {
    path: '/onboarding/about',
    name: 'onboarding-about',
    component: OnboardingAbout,
  },
  {
    path: '/onboarding/how-it-works',
    name: 'onboarding-how-it-works',
    component: OnboardingHowItWorks,
  },
  {
    path: '/onboarding/help-us',
    name: 'onboarding-help-us',
    component: OnboardingHelpUs,
  },
  {
    path: '/onboarding/permissions',
    name: 'onboarding-permissions',
    component: Permissions,
  },
  {
    path: '/personal-information/registration',
    name: 'personal-information-registration',
    component: Registration,
    meta: { title: 'Tu información personal' },
  },
  {
    path: '/personal-information/birthday',
    name: 'personal-information-birthday',
    component: Birthday,
    meta: { title: 'Tu información personal' },
  },
  {
    path: '/personal-information/gender',
    name: 'personal-information-gender',
    component: Gender,
    meta: { title: 'Tu información personal' },
  },
  {
    path: '/personal-information/disability',
    name: 'personal-information-disability',
    component: Disability,
    meta: { title: 'Tu información personal' },
  },
  {
    path: '/personal-information/disability-details',
    name: 'personal-information-disability-details',
    component: DisabilityDetails,
    meta: { title: 'Tu información personal' },
  },
  {
    path: '/personal-information/complete',
    name: 'personal-information-complete',
    component: Complete,
    meta: { title: 'Tu información personal' },
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { title: 'Busca ayudas para realizar tareas' },
  },
  {
    path: '/buscar/',
    name: 'search',
    component: SearchResults,
    meta: { title: 'Resultados de tu búsqueda' },
  },
  // @todo
  // {
  //   path: '/lugares/nuevo',
  //   name: 'place-create',
  //   component: PlacesNew,
  // },
  {
    path: '/evaluacion/:grade/',
    name: 'place-score',
    component: PlaceScore,
    meta: { title: 'Significado de evaluación' },
  },
  {
    path: '/nuevo-lugar/intro/:service_id?',
    name: 'new-place-intro',
    component: NewPlaceIntro,
    meta: { title: '¿Como agregar un nuevo lugar?' },
  },
  {
    path: '/nuevo-lugar/intro2/:service_id?',
    name: 'new-place-intro2',
    component: NewPlaceIntro2,
    meta: { title: '¿Como agregar un nuevo lugar?' },
  },
  {
    path: '/nuevo-lugar/intro3/:service_id?',
    name: 'new-place-intro3',
    component: NewPlaceIntro3,
    meta: { title: '¿Como agregar un nuevo lugar?' },
  },
  {
    path: '/nuevo-lugar/:service_id?',
    name: 'new-place',
    component: NewPlace,
    meta: { title: 'Agregar un nuevo lugar' },
  },
  {
    path: '/nuevo-lugar/completo',
    name: 'new-place-complete',
    component: NewPlaceComplete,
    meta: { title: 'Agregar un nuevo lugar' },
  },
  {
    path: '/nueva-tarea/',
    name: 'new-task',
    component: NewTask,
    meta: { title: 'Agregar nueva tarea' },
  },
  {
    path: '/nueva-tarea/intro',
    name: 'new-task-intro',
    component: NewTaskIntro,
    meta: { title: '¿Como agregar una nueva tarea?' },
  },
  {
    path: '/nueva-tarea/intro2',
    name: 'new-task-intro2',
    component: NewTaskIntro2,
    meta: { title: '¿Como agregar una nueva tarea?' },
  },
  {
    path: '/nueva-tarea/intro3',
    name: 'new-task-intro3',
    component: NewTaskIntro3,
    meta: { title: '¿Como agregar una nueva tarea?' },
  },
  {
    path: '/nueva-tarea/intro4',
    name: 'new-task-intro4',
    component: NewTaskIntro4,
    meta: { title: '¿Como agregar una nueva tarea?' },
  },
  {
    path: '/nueva-tarea/intro5',
    name: 'new-task-intro5',
    component: NewTaskIntro5,
    meta: { title: '¿Como agregar una nueva tarea?' },
  },
  {
    path: '/agregar-tareas-intro',
    name: 'add-tasks-intro',
    component: AddTasksIntro,
  },
  {
    path: '/agregar-tareas-intro2',
    name: 'add-tasks-intro2',
    component: AddTasksIntro2,
  },
  {
    path: '/agregar-tareas-intro3',
    name: 'add-tasks-intro3',
    component: AddTasksIntro3,
  },
  {
    path: '/agregar-tareas-intro4',
    name: 'add-tasks-intro4',
    component: AddTasksIntro4,
  },
  {
    path: '/agregar-tareas-intro5',
    name: 'add-tasks-intro5',
    component: AddTasksIntro5,
  },
  {
    path: '/evaluacion-lugar/',
    name: 'place-evaluation',
    component: PlaceEvaluation,
  },
  {
    path: '/evaluacion-lugar/confirmacion',
    name: 'place-evaluation-confirmation',
    component: PlaceEvaluationConfirmation,
  },
  {
    path: '/evaluacion-lugar/completa',
    name: 'place-evaluation-complete',
    component: PlaceEvaluationComplete,
  },
  {
    path: '/evaluacion-lugar/intro',
    name: 'place-evaluation-intro',
    component: PlaceEvaluationIntro,
    meta: { title: '¿Como evaluar un lugar?' },
  },
  {
    path: '/evaluacion-lugar/intro2',
    name: 'place-evaluation-intro2',
    component: PlaceEvaluationIntro2,
    meta: { title: '¿Como evaluar un lugar?' },
  },
  {
    path: '/evaluacion-lugar/intro3',
    name: 'place-evaluation-intro3',
    component: PlaceEvaluationIntro3,
    meta: { title: '¿Como evaluar un lugar?' },
  },
  {
    path: '/evaluacion-lugar/intro4',
    name: 'place-evaluation-intro4',
    component: PlaceEvaluationIntro4,
    meta: { title: '¿Como evaluar un lugar?' },
  },
  {
    path: '/nuevo-apoyo/intro',
    name: 'new-aid-intro',
    component: NewAidIntro,
    meta: { title: '¿Como armar pictogramas?' },
  },
  {
    path: '/nuevo-apoyo/como-funciona',
    name: 'new-aid-intro2',
    component: NewAidIntro2,
    meta: { title: '¿Como armar pictogramas?' },
  },
  {
    path: '/nuevo-apoyo/como-se-construye',
    name: 'new-aid-intro3',
    component: NewAidIntro3,
    meta: { title: '¿Como armar pictogramas?' },
  },
  {
    path: '/nuevo-apoyo/notificacion',
    name: 'new-aid-intro4',
    component: NewAidIntro4,
    meta: { title: '¿Como armar pictogramas?' },
  },
  {
    path: '/nuevo-apoyo/resumen/',
    name: 'new-aid-summary',
    component: NewAidSummary,
  },
  {
    path: '/nuevo-apoyo/completado/',
    name: 'new-aid-complete',
    component: NewAidComplete,
  },
  {
    path: '/nuevo-apoyo/:stepId/',
    name: 'new-aid-step',
    component: NewAidStep,
    meta: { title: 'Arma tu pictograma' },
  },
  {
    path: '/nuevo-apoyo/confirmacion/',
    name: 'new-aid-step-confirmation',
    component: NewAidStepConfirmation,
  },
  {
    path: '/acerca-de/',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { title: 'Acerca de' },
  },
  {
    path: '/colabora-con-nosotros/',
    name: 'colaborate',
    component: () => import(/* webpackChunkName: "about" */ '../views/Colaborate.vue'),
    meta: { title: 'Colabora con nosotros' },
  },
  {
    path: '/:categorySlug/',
    name: 'category',
    component: CategoryArchive,
  },
  {
    path: '/:categorySlug/:serviceSlug/',
    name: 'service-single',
    component: ServiceSingle,
  },
  {
    path: '/:categorySlug/:serviceSlug/:venueSlug/',
    name: 'place-single',
    component: PlaceSingle,
  },
  {
    path: '/:categorySlug/:serviceSlug/:venueSlug/:taskSlug/',
    name: 'task-single',
    component: TaskSingle,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  window.speechSynthesis.cancel();
  if ((!to.path.includes('/onboarding') && to.name !== 'splash' && !to.path.includes('/tu-ubicacion')) && Object.keys(JSON.parse(localStorage.getItem('location') || '{}')).length === 0) {
    next({ name: 'your-location' });
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  if (to.meta !== undefined && to.meta.title) {
    const { title } = to.meta;
    Vue.nextTick(() => {
      document.title = `${title} | Pictos`;
    });
  }
});

export default router;
