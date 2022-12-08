<template>
    <div class="container-fluid p-0">

<!--        NAVIGATION BAR-->
        <nav-bar />

        <div class="container-fluid p-0">

<!--            MAIN CONTENT-->
            <router-view />

        </div>

    </div>

</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
    name:"vueDemo",
    components: {NavBar}
}
</script>


<style scoped>

</style>
