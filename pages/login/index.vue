<template>
  <div>
    <form @submit.prevent="submit" class="m-5">
      <div class="form-group m-3">
        <input
          class="form-control"
          type="email"
          placeholder="Email"
          v-model="email"
          required
        />
      </div>
      <div class="form-group m-3">
        <input
          class="form-control"
          type="password"
          placeholder="Password"
          v-model="password"
          required
        />
      </div>
      <button :disabled="isLoading" class="btn btn-primary m-3" type="submit">Login</button>
    </form>
    <div v-if="error" class="m-5">
      <div class="alert alert-danger" role="alert">
        <p>
          Code: {{errorCode?errorCode:'null'}}
        </p>
        <p class="mb-0">
          Message: {{errorMsg?errorMsg:'null'}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      error:false,
      errorMsg:'',
      errorCode:''
    };
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      this.error = false;
      if(!this.email || !this.password) return;
      this.isLoading = true;
      try{
        const res = await this.$store.dispatch("auth/loginUser", {
          email: this.email,
          password: this.password,
        });

        this.isLoading = false;
        this.$router.push({path: '/'});
      } catch (err) {
        this.isLoading = false;
        this.error = true;
        this.errorMsg = err.message
        this.errorCode = err.code
      }
    },
  },
};
</script>

<style>
</style>