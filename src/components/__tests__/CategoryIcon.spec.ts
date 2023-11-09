import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CategoryIcon from '../CategoryIcon.vue'

describe('CategoryIcon', () => {
  it('renders properly', () => {
    const wrapper = mount(CategoryIcon, { props: { category: 'transporte' } })
    expect(wrapper).toMatchSnapshot()
  })
})
