import Factory from '../factory';
import SpinnerContainer from '@/components/SpinnerContainer.vue';

const testFactory = new Factory(SpinnerContainer);
let wrapper;

describe('components/SpinnerContainer', () => {
  describe('Renders', () => {
    beforeEach(() => {
      wrapper = testFactory.shallowMount();
    });

    afterEach(() => {
      wrapper = testFactory.destroy();
    });

    test('Render div.spinner-container', () => {
      expect(wrapper.find('div.spinner-container')).toBeTruthy();
    });
  });
});
