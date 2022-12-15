<template>
  <div>
    <Header />
    <Content />
    <SpinnerContainer />
  </div>
</template>

<script>
import Vue from 'vue';
import Header from '@/components/Header.vue';
import Content from '@/components/Content.vue';
import SpinnerContainer from '@/components/SpinnerContainer.vue';

export default Vue.extend({
  name: 'HomePage',
  components: {
    Header,
    Content,
    SpinnerContainer
  }
});
</script>
