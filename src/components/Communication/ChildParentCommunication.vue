<template>
    <h1 class="mb-3">Child to Parrent communication</h1>

<!--    PARENT COMPONENT-->
    <Card title="THIS IS PARENT COMPONENT" clazz="bg-success text-white">
        <h3>MESSAGE FROM CHILD : {{message}}</h3>

<!--        CHILD COMPONENT-->
        <child-component class="mt-3" #default="meta" @messageFromChild="messageFromChild">
            <input type="text" class="form-control" placeholder="TYPE SOMETHING HERE"
                   @input="meta.communicate"
            >
        </child-component>
    </Card>
</template>

<script>
import Card from "@/components/Communication/Card.vue";
import ChildComponent from "@/components/Communication/ChildComponent.vue";

export default {
    name: "ChildParentCommunication",
    components: {ChildComponent, Card},
    data(){
        return{
            message:""
        }
    },
    methods:{ //GETTING MESSAGE FROM CHILD
        messageFromChild(msg){
            this.message = msg
        }
    }
}
</script>

<style scoped>

</style>