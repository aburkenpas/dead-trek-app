import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import BridgeDownActions from '@/components/playactions/BridgeDownActions.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('BridgeDownActions.vue', () => {
  describe('dispatches called', () => {
    let state, actions, store

    beforeEach(() => {
      state = {
        resolvedRoadCard: false,
        message: ''
      }

      actions = {
        updateMessage: jest.fn(),
        addTwoCards: jest.fn(),
        setRoadCardResolved: jest.fn()
      }

      store = new Vuex.Store({
        modules: {
          myModule: {
            state,
            actions
          }
        }
      })
    })

    it('updateMessage actions is triggered', () => {
      const wrapper = shallowMount(BridgeDownActions, { store, localVue })
      const button = wrapper.find('button')
      button.trigger('click')
      expect(actions.updateMessage).toHaveBeenCalled()
    })

    it('addTwoCards actions is triggered', () => {
      const wrapper = shallowMount(BridgeDownActions, { store, localVue })
      const button = wrapper.find('button')
      button.trigger('click')
      expect(actions.addTwoCards).toHaveBeenCalled()
    })

    it('setRoadCardResolved actions triggered', () => {
      const wrapper = shallowMount(BridgeDownActions, { store, localVue })
      const button = wrapper.find('button')
      button.trigger('click')
      expect(actions.setRoadCardResolved).toHaveBeenCalled()
    })
  })
})
