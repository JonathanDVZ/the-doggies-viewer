import Factory from '../factory';
import Content from '@/components/Content.vue';

let testFactory = new Factory(Content, {
  data() {
    return {
      web3: null
    };
  }
});

let wrapper;

describe('components/Content', () => {
  describe('Renders', () => {
    beforeEach(() => {
      wrapper = testFactory.shallowMount();
    });

    afterEach(() => {
      wrapper = testFactory.destroy();
    });

    test('Render Content', () => {
      expect(wrapper.find('div#content')).toBeTruthy();
    });

    test('Dispatch a getAccounts action when the component is mounted', () => {
      expect(testFactory.store().dispatch).toHaveBeenCalledWith('getAccounts');
    });
  });
  describe('Computed', () => {
    beforeEach(() => {
      wrapper = testFactory.shallowMount();
    });

    afterEach(() => {
      wrapper = testFactory.destroy();
    });

    test('connected is false when accounts array is empty', () => {
      expect(wrapper.vm.connected).toBe(false);
    });

    test('connected is true when accounts array is not empty', () => {
      testFactory = new Factory(Content, {
        data() {
          return {
            web3: null
          };
        },
        store: { state: { accounts: ['0x320D268d69C4b3f18584993b8DDF69fa185132EC'] } }
      });
      wrapper = testFactory.shallowMount();
      expect(wrapper.vm.connected).toBe(true);
    });

    test('showNftData is false when connected is false or nftData is empty', () => {
      expect(wrapper.vm.showNftData).toBe(false);
    });

    test('showNftData is true when connected is true and nftData is not empty', () => {
      testFactory = new Factory(Content, {
        data() {
          return {
            web3: null
          };
        },
        store: {
          state: {
            accounts: ['0x320D268d69C4b3f18584993b8DDF69fa185132EC'],
            nftData: { name: 'Name', description: 'Description', iframe_url: 'iframe_url' }
          }
        }
      });
      wrapper = testFactory.shallowMount();
      expect(wrapper.vm.showNftData).toBe(true);
    });
  });
  describe('Methods', () => {
    beforeEach(() => {
      wrapper = testFactory.shallowMount();
    });

    afterEach(() => {
      wrapper = testFactory.destroy();
    });

    test('initialize is a function', () => {
      expect(typeof wrapper.vm.initialize).toBe('function');
    });

    test('When initialize is called, then getAccounts is dispatched', async () => {
      await wrapper.vm.initialize();
      expect(testFactory.store().dispatch).toHaveBeenCalledWith('getAccounts');
    });

    test('onConnect is a function', () => {
      expect(typeof wrapper.vm.onConnect).toBe('function');
    });

    test('When onConnect is called, then connectWallet is dispatched', async () => {
      await wrapper.vm.onConnect();
      expect(testFactory.store().dispatch).toHaveBeenCalledWith('connectWallet');
    });

    test('onSubmit is a function', () => {
      expect(typeof wrapper.vm.onSubmit).toBe('function');
    });

    test('When onSubmit is called, then getNftData is dispatched with tokenId', async () => {
      const tokenId = 1;
      await wrapper.vm.onSubmit(tokenId);
      expect(testFactory.store().dispatch).toHaveBeenCalledWith('getNftData', tokenId);
    });

    test('When onSubmit is called, then getOwnerOf is dispatched with tokenId', async () => {
      const tokenId = 1;
      await wrapper.vm.onSubmit(tokenId);
      expect(testFactory.store().dispatch).toHaveBeenCalledWith('getOwnerOf', tokenId);
    });

    test('onRandomSearch is a function', () => {
      expect(typeof wrapper.vm.onRandomSearch).toBe('function');
    });

    test('When onRandomSearch is called, then getTotalSupply is dispatched', async () => {
      await wrapper.vm.onRandomSearch();
      expect(testFactory.store().dispatch).toHaveBeenCalledWith('getTotalSupply');
    });
  });
});
