import type {Component} from 'vue'

export interface Onboarding {
  title: string
  body: string
  image: Component
}

export type OnboardingOrComponent = Onboarding | Component