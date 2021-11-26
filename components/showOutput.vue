<template>
  <div>
    <div v-if="$store.state.loginCheck">
      <div class="alert alert-success token" role="alert">
          JWT Token: {{ $store.state.JWTToken?$store.state.JWTToken:'null' }}
      </div>
      <div class="alert alert-success token" role="alert">
          Refresh Token: {{ $store.state.refreshToken?$store.state.refreshToken:'null' }}
      </div>
      <button @click="refreshTheToken" class="btn btn-primary">Refresh Token</button>
    </div>
    <div v-else class="text-center">
      <h3>Please login/register to get the token!</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jwtToken: "",
      refreshToken: ""
    };
  },
  methods: {
    async refreshTheToken(){
        const res = await this.$store.dispatch("auth/getJWT", {
            email: this.email,
            password: this.password,
        });
    }
  },
};
</script>

<style>
.token{
  word-break: break-word;
}
</style>