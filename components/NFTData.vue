<template>
  <div class="nftdata w-100">
    <b-row class="w-100 m-0">
      <b-col md="6" class="d-flex justify-content-center align-items-center">
        <div class="nftdata__text-container p-3 rounded">
          <div class="mb-4">
            <h3 class="nftdata__title">Title and owner</h3>
            <p class="nftdata__text mb-0">{{ data.name }}</p>
            <a :href="ownerLink" target="_blank" class="nftdata__link">{{
              trucateAddress
            }}</a>
          </div>
          <div>
            <h3 class="nftdata__title">Description</h3>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="nftdata__text mb-0" v-html="newDescription"></p>
          </div>
        </div>
      </b-col>
      <b-col md="6" class="d-flex justify-content-center">
        <iframe
          title="Inline Frame Example"
          class="nftdata__iframe"
          :src="data.iframe_url"
        >
        </iframe>
      </b-col>
    </b-row>
    <b-row class="w-100 m-0">
      <b-table
        striped
        :items="traitsList"
        class="nftdata__table rounded"
      ></b-table>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'NFTData',
  props: {
    data: {
      type: Object,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
  },
  computed: {
    ownerLink() {
      return `https://etherscan.io/address/${this.owner}`
    },
    trucateAddress() {
      return `${this.owner.substr(0, 6)}...${this.owner.substr(-4)}`
    },
    newDescription() {
      let newDescription = this.data.description.split('\n\n')
      newDescription.shift()

      newDescription = newDescription.join('<br /><br />')

      newDescription = newDescription
        .replace('[', '<a href="')
        .replace('](', '" target="_blank">')
        .replace(')', '</a>')

      return newDescription
    },
    traitsList() {
      return this.data.attributes
    },
  },
}
</script>
