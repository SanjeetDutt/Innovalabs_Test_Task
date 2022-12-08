<template>
    <div class="d-flex align-items-center justify-content-center" style="min-height: 95vh">
        <div class="d-block text-center">
            <span class="sub-title">Code written by:</span>
            <h1 class="heading">Sanjeet Dutt</h1>
            <h5 class="mt-5">Please click following link to visit solution page</h5>
            <div class="row">
                <div class="col link-container" v-for="(link, i) in links">
                    <router-link :to="{name : link.to}" class="links">{{ link.title }}</router-link>
                </div>
            </div>
            <a class="links" href="https://sanjeetdutt.in">Click here to visit my portfolio website.</a>
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
    computed: {
        links() { // RETURN ALL NAVIGATION FROM ROUTER
            const pageName = this.$route.name
            return this.$router.getRoutes()
                .filter(e=>e.name !== "home")
                .map(link => {
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
.heading {
    font-size: 6rem;
    font-weight: 900;
}

.sub-title {
    font-size: 1rem;
    font-style: italic;
}
.link-container{
    padding: 2rem 1rem;
}
.links{
    text-decoration: none;
    color: blue;
    font-size: 1.25rem;
}
.links:hover{
    text-decoration: underline;
}
</style>