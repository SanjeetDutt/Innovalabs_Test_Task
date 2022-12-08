<template>
    <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
<!--            PORTFOLIO LINK-->
            <a class="navbar-brand" href="https://sanjeetdutt.in">Sanjeet Dutt</a>

<!--            MOBILE TOGGLE BTN-->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

<!--            NAV LINKS-->
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item mx-1" v-for="(link, i) in links" :key="i">
                        <router-link :to="{name : link.to}" class="nav-link" :class="link.isActive ? 'active bg-primary rounded text-white' : ''" aria-current="page">{{link.title}}</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "NavBar",
    computed:{
        links(){ // RETURN ALL NAVIGATION FROM ROUTER
            const pageName = this.$route.name
            return this.$router.getRoutes().map(link=>{
                return {
                    to: link.name,
                    title: link.meta.title,
                    isActive: link.name === pageName
                }
            })
        }
    },

}
</script>

<style scoped>

</style>