<template>
    <h1 class="mb-3">Child to Child communication</h1>

<!--    PARENT-->
    <Card title="THIS IS PARENT COMPONENT" clazz="bg-success text-white">
        <div class="row">
            <div class="col-md-6">

<!--                CHILD 1-->
                <child-component class="mt-3" #default="meta" @messageFromChild="messageFromChild">
                    <input type="text" class="form-control" placeholder="TYPE SOMETHING HERE"
                           @input="meta.communicate"
                    >
                </child-component>

            </div>
            <div class="col-md-6">
<!--                CHILD 2-->
                <child-component class="mt-3" :messageFromParent="message"/>
            </div>
        </div>

    </Card>


</template>

<script>
import Card from "@/components/Communication/Card.vue";
import ChildComponent from "@/components/Communication/ChildComponent.vue";

export default {
    name: "ChildChildCommunication",
    components: {ChildComponent, Card},
    data(){
        return{
            message:""
        }
    },
    methods:{
        messageFromChild(msg){ // GETTING MESSAGE FROM CHILD
            this.message = msg
        }
    }
}
</script>

<style scoped>

</style>