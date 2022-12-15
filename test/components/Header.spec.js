import Factory from '../factory';
import Header from '@/components/Header.vue';

const testFactory = new Factory(Header);
let wrapper;

describe('components/Header', () => {
  describe('Renders', () => {
    beforeEach(() => {
      wrapper = testFactory.shallowMount();
    });

    afterEach(() => {
      wrapper = testFactory.destroy();
    });

    test('Render div#header', () => {
      expect(wrapper.find('div#header')).toBeTruthy();
    });
  });
});
