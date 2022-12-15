import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import state from './state';

const localVue = createLocalVue();
localVue.use(Vuex);

let mountedElement = null;

const createStore = (storeConfig) => {
  const store = new Vuex.Store(storeConfig);

  // This is the mocked dispatch
  store.dispatch = jest.fn();
  return store;
};

/*
  This factory function helps to create all the logic to mount a component and set the configs. 
  In this way, it is avoided to write this logic in each test.
*/
export default function factory(element, props = {}) {
  const { store: newStore, data, computed, propsData } = props;

  // The store is created with a default state and the mocked dispatch
  const store = createStore(
    newStore
      ? {
          state: { ...state, ...newStore.state }
        }
      : {
          state
        }
  );

  const elementToMount = element;
  const defaultMountingOptions = {
    localVue,
    store,
    data,
    computed,
    propsData
  };

  this.store = () => store;

  // This is to shallowMount our element with its options
  this.shallowMount = () => {
    mountedElement = shallowMount(elementToMount, defaultMountingOptions);
    return mountedElement;
  };

  // This is necessary to clear the memory.
  this.destroy = () => {
    mountedElement = null;
    return mountedElement;
  };
}
