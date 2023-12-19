/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />
/// <reference types="google.maps" />
import 'vue-router'
import { Navbar } from '@/types/navbar'

// To ensure it is treated as a module, add at least one `export` statement
export {}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    navbar?: Navbar
  }
}