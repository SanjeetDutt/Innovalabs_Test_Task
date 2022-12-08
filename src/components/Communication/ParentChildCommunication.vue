<template>
    <h1 class="mb-3">Parent to Child communication</h1>

<!--    PARENT -->
    <Card title="THIS IS PARENT COMPONENT" clazz="bg-success text-white">
        <input type="text" class="form-control" placeholder="TYPE SOMETHING HERE" v-model="text">

<!--        CHILD-->
        <child-component class="mt-3" :messageFromParent="text"/>
    </Card>
</template>

<script>
import ChildComponent from "@/components/Communication/ChildComponent.vue";
import Card from "@/components/Communication/Card.vue";

export default {
    name: "ParentChildCommunication",
    components: {Card, ChildComponent},
    data(){
        return{
            text:""
        }
    }
}
</script>

<style scoped>

</style>