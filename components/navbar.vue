<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <nuxt-link tag="a" class="navbar-brand" to="/">Firebase Auth</nuxt-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <client-only>
        <ul class="navbar-nav ms-auto">
          <template v-if="!$store.state.loginCheck">
            <li class="nav-item">
              <nuxt-link tag="a" class="nav-link" to="/register">Register</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link tag="a" class="nav-link" to="/login">Login</nuxt-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="logout">Logout</a>
            </li>
          </template>
        </ul>
      </client-only>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  methods:{
    logout(){
      this.$store.dispatch("auth/logoutUser");
    }
  }
}
</script>

<style>
.nuxt-link-exact-active {
  color: rgba(0,0,0,.9)!important;
}
</style>