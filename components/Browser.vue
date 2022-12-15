<template>
  <div class="browser d-flex align-items-center flex-column p-4 rounded">
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
        autocomplete="off"
      ></b-form-input>
      <b-button type="submit" variant="primary" class="mt-3" block> Search </b-button>
      <b-button variant="secondary" class="mt-3" block @click="onRandomSearch">
        Search random Doggie
      </b-button>
    </b-form>
    <b-button v-else variant="primary" @click="onConnect">Connect</b-button>
  </div>
</template>

<script>
export default {
  name: 'BrowserComponent',
  props: {
    connected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tokenId: null
    };
  },
  methods: {
    onSubmit($event) {
      $event.preventDefault();
      this.$emit('on-submit', this.tokenId);
      this.tokenId = null;
    },
    onConnect() {
      this.$emit('on-connect');
    },
    onRandomSearch() {
      this.$emit('on-random-search');
      this.tokenId = null;
    }
  }
};
</script>
