<template>
  <div class="w-100">
    <b-row>
      <b-col>
        <h3>{{ data.name }}</h3>
      </b-col>
      <b-col>
        <iframe
          title="Inline Frame Example"
          width="300"
          height="200"
          :src="data.iframe_url"
        >
        </iframe>
      </b-col>
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
  },
}
</script>
