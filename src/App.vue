<template>
  <div id="app">
    <div v-if="$route.path == '/login'">
        <router-view class="main_component_app" />
    </div>

    <div v-else class="wrapper">
        <SideBar/>
        <div class="main_content">
            <TopNav/>
            <router-view class="main_component_app" />
        </div>
    </div>
  </div>
</template>
<script>
import SideBar from "@/components/SideBar.vue"
import TopNav from "@/components/TopNav.vue"
export default {
    name: "App",
    components: { 
        SideBar,
        TopNav
    }
}

</script>

<style lang="scss">
@import "~bulma";

.main_component_app {
    background-color: #e2e2e2;
    width: 100%;
    height: 100vh;
}

</style>
