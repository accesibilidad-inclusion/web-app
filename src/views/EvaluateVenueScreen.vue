<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'

import {useAppNavStore} from '@/stores/app-nav.js'
import {useAppSessionStore} from '@/stores/app-session.js'

const router = useRouter()
const route = useRoute()
const appNav = useAppNavStore()
const appSession = useAppSessionStore()

if (route.params.type === 'presencial' && appNav.onboarding.presentialEvaluation) {
  appNav.redirectTo = route.fullPath
  router.push('/aprende-a-evaluar/presencial')
}
if (route.params.type === 'en-internet' && appNav.onboarding.onlineEvaluation) {
  appNav.redirectTo = route.fullPath
  router.push('/aprende-a-evaluar/en-internet')
}
if (!appSession.user.isRegistered) {
  appNav.redirectTo = route.fullPath
  router.push('/informacion-personal')
}
</script>

<template>Orale</template>

<style lang="scss" scoped></style>
