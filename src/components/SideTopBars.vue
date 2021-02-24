<template>
  <div>
    <nav class="navbar">
      <ul class="navbar-nav">
        <li class="logo">
          <a href="#" class="nav-link">
            <span class="link-text logo-text">Bunkers</span>
            <i class="fa fa-pizza-slice"></i>
          </a>
        </li>
        <li class="nav-item">
          <router-link to="/" exact class="nav-link" v-bind:class="{'nav-active': isactive('Home')}">
            <i class="fas fa-home"></i>
            <span class="link-text">Dashboard</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/produtos/" exact v-bind:class="{'nav-active': isactive('Produtos')}" class="nav-link">
            <i class="fas fa-boxes"></i>
            <span class="link-text">Produtos</span>
          </router-link>
        </li>
        <li class="nav-item" id="themeButton">
          <a href="#" class="nav-link">
            <span class="link-text">Tauã Negri</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
      isactive(name) {
          if (name == this.$store.state.current_page) {
              return true
          } else {
              return false
          }
      }
  }
};
</script>

<style>
@import "../assets/sidebar-class.css";
</style>
