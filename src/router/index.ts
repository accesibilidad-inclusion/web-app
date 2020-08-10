import Vue from 'vue';
import VueRouter from 'vue-router';
// On Boarding
import Splash from '../views/Splash.vue';
import Onboarding from '../views/onboarding/Welcome.vue';
import OnboardingAbout from '../views/onboarding/About.vue';
import OnboardingHowItWorks from '../views/onboarding/HowItWorks.vue';
import OnboardingHelpUs from '../views/onboarding/HelpUs.vue';
import Permissions from '../views/onboarding/Permissions.vue';
import Registration from '../views/onboarding/Registration.vue';
import Birthday from '../views/onboarding/Birthday.vue';
import Gender from '../views/onboarding/Gender.vue';
import Disability from '../views/onboarding/Disability.vue';
import DisabilityDetails from '../views/onboarding/DisabilityDetails.vue';
import Complete from '../views/onboarding/Complete.vue';

import Home from '../views/Home.vue';
import SearchResults from '../views/SearchResults.vue';
import CategoryArchive from '../views/CategoryArchive.vue';
import ServiceSingle from '../views/ServiceSingle.vue';
import PlaceSingle from '../views/PlaceSingle.vue';
import PlaceScore from '../views/PlaceScore.vue';
import TaskSingle from '../views/TaskSingle.vue';

import NewPlaceIntro from '../views/NewPlaceIntro.vue';
import NewPlaceIntro2 from '../views/NewPlaceIntro2.vue';
import NewPlaceIntro3 from '../views/NewPlaceIntro3.vue';

import NewTaskIntro from '../views/NewTaskIntro.vue';
import NewTaskIntro2 from '../views/NewTaskIntro2.vue';
import NewTaskIntro3 from '../views/NewTaskIntro3.vue';
import NewTaskIntro4 from '../views/NewTaskIntro4.vue';
import NewTaskIntro5 from '../views/NewTaskIntro5.vue';
import NewTask from '../views/NewTask.vue';

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

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'splash',
    component: Splash,
  },
  {
    path: '/onboarding/',
    name: 'onboarding',
    component: Onboarding,
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
    path: '/onboarding/gender',
    name: 'onboarding-gender',
    component: Gender,
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
    path: '/evaluacion/:grade/',
    name: 'place-score',
    component: PlaceScore,
  },
  {
    path: '/tareas/:taskId/',
    name: 'task-single',
    component: TaskSingle,
  },
  {
    path: '/nuevo-lugar/intro',
    name: 'new-place-intro',
    component: NewPlaceIntro,
  },
  {
    path: '/nuevo-lugar/intro2',
    name: 'new-place-intro2',
    component: NewPlaceIntro2,
  },
  {
    path: '/nuevo-lugar/intro3',
    name: 'new-place-intro3',
    component: NewPlaceIntro3,
  },
  {
    path: '/nueva-tarea/',
    name: 'new-task',
    component: NewTask,
  },
  {
    path: '/nueva-tarea/intro',
    name: 'new-task-intro',
    component: NewTaskIntro,
  },
  {
    path: '/nueva-tarea/intro2',
    name: 'new-task-intro2',
    component: NewTaskIntro2,
  },
  {
    path: '/nueva-tarea/intro3',
    name: 'new-task-intro3',
    component: NewTaskIntro3,
  },
  {
    path: '/nueva-tarea/intro4',
    name: 'new-task-intro4',
    component: NewTaskIntro4,
  },
  {
    path: '/nueva-tarea/intro5',
    name: 'new-task-intro5',
    component: NewTaskIntro5,
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
  },
  {
    path: '/evaluacion-lugar/intro2',
    name: 'place-evaluation-intro2',
    component: PlaceEvaluationIntro2,
  },
  {
    path: '/evaluacion-lugar/intro3',
    name: 'place-evaluation-intro3',
    component: PlaceEvaluationIntro3,
  },
  {
    path: '/evaluacion-lugar/intro4',
    name: 'place-evaluation-intro4',
    component: PlaceEvaluationIntro4,
  },
  {
    path: '/nuevo-apoyo/intro',
    name: 'new-aid-intro',
    component: NewAidIntro,
  },
  {
    path: '/nuevo-apoyo/como-funciona',
    name: 'new-aid-intro2',
    component: NewAidIntro2,
  },
  {
    path: '/nuevo-apoyo/como-se-construye',
    name: 'new-aid-intro3',
    component: NewAidIntro3,
  },
  {
    path: '/nuevo-apoyo/notificacion',
    name: 'new-aid-intro4',
    component: NewAidIntro4,
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
  },
  {
    path: '/nuevo-apoyo/:stepId/confirmacion/',
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
  },
  {
    path: '/colabora-con-nosotros/',
    name: 'colaborate',
    component: () => import(/* webpackChunkName: "about" */ '../views/Colaborate.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
