import {defineStore} from 'pinia'
import {useFetch} from '@vueuse/core'

import {Category} from '@/model/category'
import {Location} from '@/model/location'
import type {Region} from '@/types/region'
import {Question} from '@/model/question'

export const useAppDataStore = defineStore('appData', {
  state: () => {
    return {
      initialized: false,
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
          title: 'Sin evaluaciones',
          desc: '',
          longdesc:
            'Todavía nadie ha evaluado la accesibilidad de este lugar. Si te encuentras aquí y tienes tiempo' +
            ' para ayudar a la comunidad con tu evaluación, por favor hazlo.'
        },
        {
          grade: 1,
          title: 'Pésimo',
          desc: 'El servicio evaluado tiene que mejorar todo',
          longdesc:
            'Diferentes personas han calificado la accesibilidad de este servicio con nivel de PÉSIMO' +
            ' debido a que presenta problemas graves de accesibilidad en uno o varios de los siguientes aspectos:',
          change: '',
          feature1: 'Visibilidad: ',
          feature2: 'Comprensión: ',
          feature3: 'Espacialidad: ',
          visibility:
            'El tamaño de las letras es muy pequeño y los colores y contrastes necesitan cambios.',
          understanding: 'Los mensajes y las señales necesitan imágenes y una mejor redacción.',
          spatiality: 'El espacio es sucio, hay mala luminosidad y hay demasiado ruido.'
        },
        {
          grade: 2,
          title: 'Malo',
          desc: 'El servicio evaluado necesita muchas mejoras',
          longdesc:
            'Diferentes personas han calificado la accesibilidad es este servicio con el nivel de MALO.',
          change:
            'Este servicio tiene problemas de accesibilidad en uno o varios de los siguientes aspectos:',
          feature1: 'Visibilidad: ',
          feature2: 'Comprensión: ',
          feature3: 'Espacialidad: ',
          visibility:
            'El tamaño de las letras es muy pequeño y los colores y contrastes no son adecuados.',
          understanding: 'Los mensajes y las señales son incomprensibles.',
          spatiality: 'El espacio necesita limpieza, hay poca luminosidad y hay ruido.'
        },
        {
          grade: 3,
          title: 'Regular',
          desc: 'El servicio evaluado no es ni bueno ni malo',
          longdesc:
            'Diferentes personas han calificado la accesibilidad es este servicio con el nivel de REGULAR.',
          change: 'Este servicio tiene puede mejorar uno o varios de los siguientes aspectos:',
          feature1: 'Visibilidad: ',
          feature2: 'Comprensión: ',
          feature3: 'Espacialidad: ',
          visibility: 'El tamaño de las letras es insuficiente y los colores provocan confusión.',
          understanding: 'Los mensajes y las señales son medianamente confusos.',
          spatiality: 'La limpeza, luminosidad y calidad acústica del espacio debe mejorar.'
        },
        {
          grade: 4,
          title: 'Bueno',
          desc: 'El servicio evaluado necesita pocas mejoras',
          longdesc:
            'Diferentes personas han calificado la accesibilidad es este servicio con el nivel de BUENO.',
          change:
            'Este servicio debe considerar uno o varios de los siguientes aspectos para mejorar:',
          feature1: 'Visibilidad: ',
          feature2: 'Comprensión: ',
          feature3: 'Espacialidad: ',
          visibility: 'Mejorar contrastes y colores de sus señales.',
          understanding: 'Redacción e imágenes en sus señales y mensajes.',
          spatiality: 'Mejorar ubicación de señales.'
        },
        {
          grade: 5,
          title: 'Excelente',
          desc: 'El servicio evaluado no necesita mejoras',
          longdesc:
            'Diferentes personas han calificado la accesibilidad es este servicio con el nivel de EXCELENTE.',
          change: 'Este servicio no presenta problemas de accesibilidad:',
          feature1: 'Visibilidad: ',
          feature2: 'Comprensión: ',
          feature3: 'Espacialidad: ',
          visibility: 'El tamaño, colores y tipografías es el adecuado.',
          understanding: 'Los mensajes están bien redactados y tienen apoyos visuales pertinentes.',
          spatiality:
            'El espacio es limpio, bien iluminado y con buenas condiciones de sonido. La señalética está bien ubicada.'
        }
      ]
    }
  },
  actions: {
    async initiation() {
      const {data} = await useFetch(`${import.meta.env.VITE_APP_API_DOMAIN}api/init`)
        .get()
        .json()
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
