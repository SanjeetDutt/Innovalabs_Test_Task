<template>
<div class="row mt-3">
    <div class="col-12 alert alert-danger" v-if="this.error">
        {{error}}
    </div>
    <div class="col-md-6">
        <textarea class="form-control" rows="30" placeholder="place your object here"
                  v-model.trim="objectInput"
        ></textarea>
        <button class="btn btn-primary mt-3 mx-1" @click="beautify">Beautify</button>
        <button class="btn btn-success mt-3 mx-1" @click="generate">Generate</button>
    </div>
    <div class="col-md-6">
        <form @submit.prevent="formSubmit" :key="formMeta">
            <dynamic-form-component v-for="(meta,i) in formMeta" :key="i"
                                    :class="i%2===0 ? 'bg-light' : ''"
                                    v-model="form[meta.token]" :is-invalid="errors.includes(meta.token)"
                                    :token="meta.token" :title="meta.props.title" :type="meta.type" :property="meta.props"
            />

            <div class="row mt-3">
                <button type="submit" class="btn btn-success" :disabled="errors.length>0 || formMeta.length ===0">Submit</button>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import DynamicFormComponent from "@/components/DynamicFormComponent.vue";

const obj = {
    blocks:[
        {
            token:"PERSON_NAME",
            type:"text",
            props:{
                title:"Enter your name",
                required: true,
                placeholder:"eg John Doe"
            }
        },{
            token:"IS_PERSON_MINOR",
            type:"checkbox",
            props:{
                title:"Is the current person minor?",
                default: false
            }
        },{
            token:"PERSON_DOB",
            type:"date",
            props:{
                title:"Enter your BOD",
                required: "IS_PERSON_MINOR",
                placeholder:"eg 01-01-2000"
            }
        },
    ]
}
export default {
    name: "DynamicForm",
    components: {DynamicFormComponent},
    data(){
        return{
            objectInput: JSON.stringify(obj, null, 4),
            error: null,
            form:{},
            formMeta:[]
        }
    },
    methods:{
        formSubmit(){
            console.log(JSON.stringify(this.form))
            alert("FORM SUBMITED. PLEASE CHECK LOG")
        },
        beautify(){
            this.objectInput = JSON.stringify(JSON.parse(this.objectInput), null, 4)
        },
        generate(){
            this.formMeta = []
            let meta = {}
            this.error = null

            try {
                meta = JSON.parse(this.objectInput)
            } catch (err){
                this.error = "Error while parsing form object. Please enter a valid JSON."
            }

            if(!meta.blocks){
                this.error = "Not able to find blocks in the input"
                return []
            }

            if(!meta.blocks instanceof Array){
                this.error = "blocks is not array"
                return []
            }

            this.formMeta =  meta.blocks.map((e,i)=>{
                const token = e.token ? e.token : "DEFAULT"+i
                if(e.props.default){
                    this.form[token] = e.props.default
                }
                return{
                    token, type:"text", props:{
                        title:"NO TITLE"
                    },
                    ...e
                }
            })

        }
    },
    computed:{
        errors(){
            const errors = []
            this.formMeta.forEach(meta=>{

                if(!meta.props.required) return // false and null will be filtered here

                const requiredProp = meta.props.required // either string or bool

                if( typeof requiredProp === "boolean" ){

                    const val = this.form[meta.token]

                    if(!val || val.trim()===""){
                        errors.push(meta.token)
                    }

                } else if(!!this.form[requiredProp] && !this.form[meta.token]) {
                    errors.push(meta.token)
                }
            })
            return errors
        }
    }
}
</script>

<style scoped>

</style>