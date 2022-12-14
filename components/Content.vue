<!-- Please remove this file from your project -->
<template>
  <b-container class="w-100 d-flex align-items-center flex-column">
    <Browser
      :connected="connected"
      @on-submit="onSubmit"
      @on-connect="onConnect"
    />
    <NFTData v-if="nftData" :data="nftData" />
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import Web3, { callContract } from '../config/web3'

export default {
  name: 'ContentComponent',
  data() {
    return {
      connected: false,
      web3: null,
    }
  },
  computed: {
    ...mapState(['nftData']),
  },
  mounted() {
    this.initialize()
  },
  methods: {
    async initialize() {
      if (window.ethereum) {
        this.web3 = Web3(window.ethereum)
        const accounts = await this.web3.eth.getAccounts()
        if (accounts.length > 0) this.connected = true
      }
    },
    onConnect() {
      if (window.ethereum) {
        this.web3.eth.requestAccounts().then(() => (this.connected = true))
      }
    },
    async onSubmit(tokenId) {
      const urlWithData = await callContract().methods.tokenURI(tokenId).call()
      this.$store.dispatch('getNftData', urlWithData)
    },
  },
}
</script>
