<template>
<div>
  <div class="container">
    <client-only>
      <show-output class="my-5" />
    </client-only>
  </div>
</div>
</template>

<script>
import showOutput from '~/components/showOutput.vue';
export default {
  components: { showOutput },
  mounted() {
    this.$store.dispatch("auth/getJWT");
  },
};
</script>
