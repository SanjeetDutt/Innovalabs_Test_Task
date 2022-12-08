<template>
<div class="row mb-1 p-2">

    <div class="col">

<!--        TO HANDEL RADIO AND CB-->
        <div class="row">
            <template v-if="['RADIO','CHECKBOX'].includes(type.toUpperCase())">

                <div class="col-auto">
                    <input :type="type" class="" :id="token" v-model="value" >
                </div>

                <div class="col">
                    <label :for="token" class="form-label">{{title}}</label>
                </div>
            </template>

<!--            OTHER TYPE OF INPUT-->
            <template v-else>
                <div class="col-6 col-md-4">
                    <label :for="token" class="form-label">{{title}}</label>
                </div>
                <div class="col-auto">
                    <input :type="type" class="form-control" :id="token" v-model="value"
                           :placeholder="placeHolder"
                    >
                </div>
            </template>
        </div>
    </div>

<!--    ERROR INDICATOR-->
    <div class="col-auto">
        <div class="text-danger" v-if="isInvalid">
            ERROR
        </div>
    </div>


</div>
</template>

<script>
export default {
    name: "DynamicFormComponent",
    emits:["update:modelValue"],
    props:{
        token:{
            required: true,
            type: String
        },
        title:{
            required: true,
            type: String
        },
        modelValue:{},
        type:{
            required: true,
            type: String
        },
        isInvalid:{
            required: false,
            default: true
        },
        property:{
            required: false,
            default:{}
        }
    },
    computed:{
        placeHolder(){
            if(this.property.placeholder)
                return this.property.placeholder
            return this.title
        },
        value: { // V-MODE FOR CUSTOM COMPONENT
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        }
    },
    watch:{
        property:{
            deep: true,
            handler: (newVal, oldVal)=>{
                if(newVal.default)
                    this.$emit('update:modelValue', newVal.default)
            }
        }
    }
}
</script>

<style scoped>

</style>