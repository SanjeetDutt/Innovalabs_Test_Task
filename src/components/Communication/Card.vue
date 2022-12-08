<template>
    <div class="card" :class="clazz">
        <div class="card-body">
            <h5 class="card-title">{{title}}</h5>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "Card",
    props:["title", "clazz"]
}
</script>

<style scoped>

</style>