<template>
    <div id="main_bar">
        <div class="topnav">
            <div class="user-menu">
                <div class="dropdown is-hoverable">
                    <div class="dropdown-trigger">
                        <div aria-haspopup="true" aria-controls="user-menu">
                            <i class="fa fa-user mr-1"></i>
                            <span>Arthur Brito</span>
                            <span class="icon is-small">
                                <i class="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </div>
                    </div>
                    <div class="dropdown-menu has-text-right" id="user-menu" role="menu">
                        <div class="dropdown-content">
                            <div class="dropdown-item">
                                <ul class="dropdown-ul">
                                    <li class="dropdown-li"><a href="#" class="dropdown-link"><i class="fa fa-cog mr-2"></i>Perfil</a></li>
                                    <li class="dropdown-li"><router-link to = "/logout" exact ><a href="#" class="dropdown-link"><i class="fa fa-sign-out-alt mr-2"></i>Log Out</a></router-link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sidebar" :class="{active:isActive}">
            <div class="sidebar-toggle">
                <i v-on:click="toogleSideBar()" class="fa fa-bars toggle-btn"></i>
            </div>
            <div class="sidebar-logo"></div>
            <ul>
                <li><router-link to = "/" exact class="router-link"><i class="fas fa-home mr-1"></i>Dashboard</router-link></li>
                <li><router-link to = "/supplies" exact class="router-link"><i class="fas fa-boxes mr-1"></i>Insumos</router-link></li>
            </ul>
        </div>
        <div class="main_body2">
            <h1>Body!!!</h1>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isActive: false
        }
    },
    methods: {
        toogleSideBar () {
            this.isActive = !this.isActive
        }
    }
}
</script>

<style>
@import '../assets/sidebar.css';
</style>