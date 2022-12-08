<template>
    <div class="container mt-5">

        <parent-child-communication />
        <br>
        <br>
        <br>
        <br>

        <child-parent-communication />
        <br>
        <br>
        <br>
        <br>

        <child-child-communication />
        <br>
        <br>
        <br>
        <br>



    </div>
</template>

<script>
import ParentChildCommunication from "@/components/Communication/ParentChildCommunication.vue";
import ChildParentCommunication from "@/components/Communication/ChildParentCommunication.vue";
import ChildChildCommunication from "@/components/Communication/ChildChildCommunication.vue";

export default {
    name: "Communication",
    components: {ChildChildCommunication, ChildParentCommunication, ParentChildCommunication}
}
</script>

<style scoped>

</style>