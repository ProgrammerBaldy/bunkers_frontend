<template>
    <div id="app">
        <div v-if="this.$router.currentRoute.name != 'login'">
            <SideTopBars />
            <TopNav/>
            <router-view class="main-content" />
        </div>
        <div v-else>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import SideTopBars from "@/components/SideTopBars.vue"
import TopNav from "@/components/TopNav.vue"
export default {
    name: "App",
    components: {
        SideTopBars,
        TopNav
    },
    /*
    onIdle () {
        this.$store.dispatch('refreshToken').then( () => {
            console.log("Called the refresh!")
        }).catch( err => {
            alert(err)
        } )
    },*/
}

</script>

<style lang="scss">
#app {
    background: #f1f1f1;
    font-size: 16px;
    height: 100vh;
}
</style>
