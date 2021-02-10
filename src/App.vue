<template>
  <div id="app">
    <div class="wrapper ">
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
    background-color: #d0d0d0;
    width: 100%;
    height: 100vh;
}

</style>
