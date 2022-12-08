<template>
    <card title="THIS IS CHILD CARD" clazz="bg-danger text-white">
        <slot :communicate="communicate">
            <h3>MESSAGE FROM PARENT : {{messageFromParent}}</h3>
        </slot>
    </card>
</template>

<script>
import Card from "@/components/Communication/Card.vue";

export default {
    name: "ChildComponent",
    components: {Card},
    emits:["messageFromChild"],
    props:{
        messageFromParent:{}
    },
    methods:{
        communicate(event){ // SENDING MESSAGE FROM CHILD
            this.$emit("messageFromChild",event.target.value)
        }
    }
}
</script>

<style scoped>

</style>