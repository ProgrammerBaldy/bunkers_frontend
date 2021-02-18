<template>
  <div id="main_comp">
    <div class="img">
      <span class="logo_text">BUNKERS</span>
    </div>
    <div class="pizza">
      <span class="pizza-icon"><i class="fa fa-pizza-slice"></i></span>
    </div>
    <div class="login">
      <form action="" class="box" v-on:submit.prevent="login">
        <div class="field">
          <label for="" class="label">Login</label>
          <div class="row">
            <i class="fa fa-user mr"></i>
            <input
              v-model="username"
              name="username"
              type="text"
              placeholder="Seu usuário"
              class="input"
              required
            />
          </div>
        </div>
        <div class="field mt mb">
          <label for="" class="label">Password</label>
          <div class="row">
            <i class="fa fa-lock mr"></i>
            <input
              v-model="password"
              name="password"
              type="password"
              placeholder="Sua senha"
              class="input"
              required
            />
          </div>
        </div>
        <div class="field">
          <div v-if="incorrectAuth" class="mydanger">
            <p><strong>Login e/ou senha incorretos!</strong></p>
          </div>
          <button class="button warning" id="loginbtn">
            <i id="spinner" class="fa fa-spinner"></i><strong>Login</strong>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<style>
@import '../assets/global-styles.css';
</style>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      incorrectAuth: false
    };
  },
  methods: {
    login() {
      document.getElementById("loginbtn").classList.toggle("active");
      this.$store
        .dispatch("userLogin", {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: "Home" });
        })
        .catch(err => {
          console.log(err);
          this.incorrectAuth = true;
          document.getElementById("loginbtn").classList.toggle("active");
        });
    }
  }
};
</script>
