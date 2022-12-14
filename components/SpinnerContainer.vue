<template>
  <div
    v-if="isLoading"
    class="spinner-container position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
  >
    <b-spinner
      style="width: 3rem; height: 3rem"
      label="Large Spinner"
    ></b-spinner>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'SpinnerContainer',
  computed: {
    ...mapState(['isLoading']),
  },
}
</script>
