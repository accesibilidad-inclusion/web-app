import {defineStore} from 'pinia'
import {useFetch} from '@vueuse/core'
import {useRoute} from 'vue-router'
import { useI18n } from 'vue-i18n'

import {Category} from '@/model/category'
import {Location} from '@/model/location'
import {Country} from '@/model/country'
import type {Region} from '@/types/region'
import {Question} from '@/model/question'

export const useAppDataStore = defineStore('appData', {
  state: () => {
    return {
      initialized: false,
      country: null as Country|null,
      regions: [] as Array<Region>,
      categories: [] as Array<Category>,
      questions: {
        presential: [] as Array<Question>,
        online: [] as Array<Question>
      },
      location: new Location() as Location,
      evaluations: [
        {
          grade: 0,
          title: 'defineEvaluations.noEvaluation.title',
          desc: '',
          longdesc: 'defineEvaluations.noEvaluation.longdesc',
          change: '',
          feature1: '',
          feature2: '',
          feature3: '',
          visibility: '',
          understanding: '',
          spatiality: ''
        },
        {
          grade: 1,
          title: 'defineEvaluations.apalling.title',
          desc: 'defineEvaluations.apalling.desc',
          longdesc: 'defineEvaluations.apalling.longdesc',
          change: '',
          feature1: 'defineEvaluations.feature1',
          feature2: 'defineEvaluations.feature2',
          feature3: 'defineEvaluations.feature3',
          visibility: 'defineEvaluations.apalling.visibility',
          understanding: 'defineEvaluations.apalling.understanding',
          spatiality: 'defineEvaluations.apalling.spatiality'
        },
        {
          grade: 2,
          title: 'defineEvaluations.bad.title',
          desc: 'defineEvaluations.bad.desc',
          longdesc: 'defineEvaluations.bad.longdesc',
          change: 'defineEvaluations.bad.change',
          feature1: 'defineEvaluations.feature1',
          feature2: 'defineEvaluations.feature2',
          feature3: 'defineEvaluations.feature3',
          visibility: 'defineEvaluations.bad.visibility',
          understanding: 'defineEvaluations.bad.understanding',
          spatiality: 'defineEvaluations.bad.spatiality'
        },
        {
          grade: 3,
          title: 'defineEvaluations.regular.title',
          desc: 'defineEvaluations.regular.desc',
          longdesc: 'defineEvaluations.regular.longdesc',
          change: 'defineEvaluations.regular.change',
          feature1: 'defineEvaluations.feature1',
          feature2: 'defineEvaluations.feature2',
          feature3: 'defineEvaluations.feature3',
          visibility: 'defineEvaluations.regular.visibility',
          understanding: 'defineEvaluations.regular.understanding',
          spatiality: 'defineEvaluations.regular.spatiality'
        },
        {
          grade: 4,
          title: 'defineEvaluations.good.title',
          desc: 'defineEvaluations.good.desc',
          longdesc: 'defineEvaluations.good.longdesc',
          change: 'defineEvaluations.good.change',
          feature1: 'defineEvaluations.feature1',
          feature2: 'defineEvaluations.feature2',
          feature3: 'defineEvaluations.feature3',
          visibility: 'defineEvaluations.good.visibility',
          understanding: 'defineEvaluations.good.understanding',
          spatiality: 'defineEvaluations.good.spatiality'
        },
        {
          grade: 5,
          title: 'defineEvaluations.excelent.title',
          desc: 'defineEvaluations.excelent.desc',
          longdesc: 'defineEvaluations.excelent.longdesc',
          change: 'defineEvaluations.excelent.change',
          feature1: 'defineEvaluations.feature1',
          feature2: 'defineEvaluations.feature2',
          feature3: 'defineEvaluations.feature3',
          visibility: 'defineEvaluations.excelent.visibility',
          understanding: 'defineEvaluations.excelent.understanding',
          spatiality: 'defineEvaluations.excelent.spatiality'
        }
      ]
    }
  },
  actions: {
    async initiation() {
      const { locale } = useI18n({ useScope: 'global' })
      const route = useRoute()
      const params = route.query.country !== undefined ? '?country=' + route.query.country : ''
      const {data} = await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/init${params}`)
        .get()
        .json()

      locale.value = data.value.country.language + '-' + data.value.country.iso_name
      this.country = data.value.country
      this.regions = data.value.regions
      this.categories = data.value.categories.map((c: Category) => new Category(c))
      this.questions = {
        presential: data.value.questions.presential.map((q: Question) => new Question(q)),
        online: data.value.questions.online.map((q: Question) => new Question(q))
      }
      this.initialized = true
    }
  },
  persist: true
})
