<!-- Please remove this file from your project -->
<template>
  <b-container class="w-100 d-flex align-items-center flex-column">
    <div class="browser d-flex align-items-center flex-column">
      <b-img
        thumbnail
        fluid
        rounded="circle"
        :src="require('~/assets/images/the-doggies-avatar.jpg')"
        alt="The Doggies avatar"
        class="browser__image"
      ></b-img>

      <h2 class="browser__title my-4">The Doggies Explorer</h2>

      <b-form v-if="connected" @submit="onSubmit">
        <label for="input-live">Token ID</label>
        <b-form-input
          id="input-live"
          v-model="tokenId"
          aria-describedby="input-live-help input-live-feedback"
          placeholder="Enter a token ID"
          trim
        ></b-form-input>
        <b-button type="submit" variant="primary" class="mt-3" block>
          Search
        </b-button>
      </b-form>
      <b-button v-else variant="primary" @click="connect">Connect</b-button>
    </div>
  </b-container>
</template>

<script>
import Web3, { callContract } from '../config/web3'
import TheDoggiesArtifact from '../config/web3/artifacts/TheDoggies'

export default {
  name: 'NuxtTutorial',
  data() {
    return {
      connected: false,
      tokenId: null,
      web3: null,
    }
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
    connect() {
      if (window.ethereum) {
        this.web3.eth.requestAccounts().then(() => (this.connected = true))
      }
    },
    async onSubmit($event) {
      $event.preventDefault()
      const response = await callContract()
        .methods.tokenURI(this.tokenId)
        .call()
      console.log(response)
    },
  },
}
</script>
