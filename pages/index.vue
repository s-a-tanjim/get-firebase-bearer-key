<template>
  <div class="container">
    <div>
      <input-form />
    </div>
  </div>
</template>

<script>
import inputForm from "~/components/inputForm.vue";
export default {
  components: { inputForm },
  mounted() {
    this.$store.dispatch("auth/getJWT");
  },
};
</script>
