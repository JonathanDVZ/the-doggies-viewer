import Factory from '../factory';
import HomePage from '@/pages/index.vue';
import Header from '@/components/Header.vue';
import Content from '@/components/Content.vue';
import SpinnerContainer from '@/components/SpinnerContainer.vue';

const testFactory = new Factory(HomePage);

let wrapper;

describe('HomePage', () => {
  describe('Renders', () => {
    beforeEach(() => {
      wrapper = testFactory.shallowMount();
    });

    afterEach(() => {
      wrapper = testFactory.destroy();
    });

    test('Render Header', () => {
      expect(wrapper.findComponent(Header)).toBeTruthy();
    });

    test('Render Content', () => {
      expect(wrapper.findComponent(Content)).toBeTruthy();
    });

    test('Render SpinnerContainer', () => {
      expect(wrapper.findComponent(SpinnerContainer)).toBeTruthy();
    });
  });
});
