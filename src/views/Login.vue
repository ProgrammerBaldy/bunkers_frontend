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
                        <input v-model="username" name="username" type="text" placeholder="Seu usuário" class="input" required>
                    </div>
                </div>
                <div class="field mt">
                    <label for="" class="label">Password</label>
                    <div class="row">
                        <i class="fa fa-lock mr"></i>
                        <input v-model="password" name="password" type="password" placeholder="Sua senha" class="input" required>
                    </div>
                </div>
                <div class="field mt-10">
                    <div v-if="incorrectAuth" class="danger">
                        <p>Login e/ou senha incorretos!</p>
                    </div>
                    <button class="button" id="loginbtn">
                        <i id="spinner" class="fa fa-spinner"></i>Login
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<style>
    @import url('https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap');
    * {
    font-family: 'Josefin Sans', sans-serif;
    }
    @keyframes slideInFromLeft {
        0% { transform: translateX(-400%);}
        70% { transform: translateX(0);}
        75% { transform: rotate(-15deg);}
        80% { transform: rotate(0deg);}
        85% { transform: rotate(15deg);}
        90% { transform: rotate(0deg);}
        100% { transform: rotate(0deg);}
    }
    @keyframes slideInFromUp {
        0% { transform: translateY(-400%);}
        50% { transform: translateY(0);}
        70% { transform: scale(2.0);}
        100% { transform: rotate(0deg);}
    }
    @-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
    @-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
    @keyframes spin { 100% { transform:rotate(360deg); } }
    .danger {
        color: #f01818;
    }
    .logo_text {
        color: #eeeeee;
        font-size: 50px;
    }
    .img:hover {
        transform: scale(1.1);
        transition: 0.5s;
    }
    .pizza-icon {
        color: #eaf824;
        font-size: 50px;
    }
    .pizza:hover {
        transform: scale(1.5);
        transition: 0.5s;
    }
    .button {
        background: rgb(124, 240, 8);
        height:30px;
        border-radius: 5px;
    }


    .fa-spinner {
        display: none;
        animation:spin 4s linear infinite;
    }


    .button.active{
        background:  rgba(124, 240, 8, 0.6);
    }


    .input {
        height:20px;
        border-radius: 5px;
    }
    .mt {
        margin-top: 5px;
    }
    .mt-10 {
        margin-top: 10px;
    }
    .mr {
        margin-right: 5px;
    }
    .row {
        display: flex;
        flex-direction: row;
    }
    .box {
        display:flex;
        align-content: center;
        flex-direction: column;
    }
    .field {
        display:flex;
        align-content: center;
        justify-content: center;
        flex-direction: column;
    }
    .label {
        font-size: 16px;
        margin-bottom: 5px;
    }
    #main_comp {
        background-color: #000000!important;
        position: absolute;
        height: 100vh;
        width: 100vw;
    }
    
  @media only screen and (max-width: 800px) {
    .img {
        position: absolute;
        top:10%;
        right:30%;
        border-radius: 10px;
        padding: 10px;
        animation: 1s ease-out 0s 1 slideInFromLeft;
    }

    .pizza {
        display:none
    }
    .login {
        position: absolute;
        bottom:50%;
        right:40%;
        background: #eeeeee;
        border-radius: 10px;
        padding: 10px;
    }
      
  }
  @media only screen and (min-width: 800px) {
    .login {
        position: absolute;
        bottom:50%;
        right:30%;
        background: #eeeeee;
        border-radius: 10px;
        padding: 10px;
    }
    .img {
        position: absolute;
        bottom:60%;
        right:60%;
        border-radius: 10px;
        padding: 10px;
        animation: 1s ease-out 0s 1 slideInFromLeft;
    }

    .pizza {
        position: absolute;
        bottom:60%;
        right:55%;
        border-radius: 10px;
        padding: 10px;
        animation: 1s ease-out 0s 1 slideInFromUp;
    }
      
  }


</style>


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
            document.getElementById('loginbtn').classList.toggle('active');
            this.$store.dispatch('userLogin', {
                username: this.username,
                password: this.password
            }).then( () => {
                this.$router.push({ name:'Home' })
            }).catch(err => {
                console.log(err)
                this.incorrectAuth = true
                document.getElementById('loginbtn').classList.toggle('active');
            })
        }
    }
}
</script>