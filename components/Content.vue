<!-- Please remove this file from your project -->
<template>
  <b-container id="content" class="w-100 d-flex align-items-center flex-column my-4">
    <Browser
      :connected="connected"
      @on-submit="onSubmit"
      @on-connect="onConnect"
      @on-random-search="onRandomSearch"
    />
    <NFTData v-if="showNftData" :data="nftData" :owner="owner" />
  </b-container>
</template>

<script>
import { mapState } from 'vuex';
import { BContainer } from 'bootstrap-vue';
import Browser from './Browser.vue';
import NFTData from './NFTData.vue';

export default {
  name: 'ContentComponent',
  components: {
    BContainer,
    Browser,
    NFTData
  },
  data() {
    return {
      web3: null
    };
  },
  computed: {
    ...mapState(['accounts', 'nftData', 'owner', 'totalSupply']),
    connected() {
      return this.accounts.length > 0;
    },
    showNftData() {
      return this.connected && Object.keys(this.nftData).length > 0;
    }
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.$store.dispatch('getAccounts');
    },
    onConnect() {
      this.$store.dispatch('connectWallet');
    },
    onSubmit(tokenId) {
      this.$store.dispatch('getNftData', tokenId);
      this.$store.dispatch('getOwnerOf', tokenId);
    },
    async onRandomSearch() {
      // The total supply is obtained to calculate the limit of the random number
      await this.$store.dispatch('getTotalSupply');
      // Now the random number can be calculated correctly
      const randomTokenId = Math.floor(Math.random() * this.totalSupply);

      // onSubmit method can be use in this case
      this.onSubmit(randomTokenId);
    }
  }
};
</script>
