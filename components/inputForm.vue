<template>
  <div>
    <form @submit.prevent="submit" class="m-5">
      <div class="form-group m-3">
        <input
          class="form-control"
          type="email"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div class="form-group m-3">
        <input
          class="form-control"
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <button class="btn btn-primary m-3">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
    };
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      this.isLoading = true;

      const res = await this.$store.dispatch("auth/loginUser", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style>
</style>