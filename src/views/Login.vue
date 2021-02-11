<template>
    <section class="hero is-black is-fullheight">
        <div class="hero-body">
            <div class="container">
            <div class="columns is-centered">
                <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                <form action="" class="box" v-on:submit.prevent="login">
                    <div class="field">
                    <label for="" class="label">Login</label>
                    <div class="control has-icons-left">
                        <input v-model="username" name="username" type="text" placeholder="Seu usuário" class="input" required>
                        <span class="icon is-small is-left">
                        <i class="fa fa-user"></i>
                        </span>
                    </div>
                    </div>
                    <div class="field">
                    <label for="" class="label">Password</label>
                    <div class="control has-icons-left">
                        <input v-model="password" name="password" type="password" placeholder="Sua senha" class="input" required>
                        <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                        </span>
                    </div>
                    </div>
                    <div class="field has-text-centered">
                        <div v-if="incorrectAuth" class="has-text-danger">
                            <p>Login e/ou senha incorretos!</p>
                        </div>
                        <button class="button is-success ">
                            Login
                        </button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: '',
            incorrectAuth: false
        }
    },
    methods: {
        login() {
            this.$store.dispatch('userLogin', {
                username: this.username,
                password: this.password
            }).then( () => {
                this.$router.push({ name:'Home' })
            }).catch(err => {
                console.log(err)
                this.incorrectAuth = true
            })
        }
    }
}
</script>

<style>

</style>