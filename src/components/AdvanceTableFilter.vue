<template>
    <div class="row">
<!--        COLUMN TITLE-->
        <div class="col-12 column-title">
            {{columnTitle}}
        </div>

<!--        COLUMN FILTER -->
        <div class="col-12 dropdown">

<!--            FILTER BTN-->
            <button type="button" class="btn btn-sm w-100 dropdown-toggle"
                    :class="filterSelected.length > 0 ? 'btn-secondary' : 'btn-outline-secondary'"
                    @click="setCurrentFilterDropDown(columnKey)">
                Filter
            </button>

<!--            FILTER FORM-->
            <form class="dropdown-menu p-4" :class="getCurrentFilter === columnKey ? 'show' : ''">

<!--                FILTER OPTIONS-->
                <div class="form-check" v-for="(option, i) in filterOptions" :key="i">
                    <input class="form-check-input" type="checkbox" @change="addToFilter" :id="'filter-' + columnKey + '-' + i"
                           :value="option" :checked="filterSelected.includes(option)">
                    <label class="form-check-label" :for="'filter-' + columnKey + '-' + i">
                        {{option}}
                    </label>
                </div>
                <div class="row">

<!--                    RESET BTN-->
                    <div class="col-6">
                        <button type="button" class="btn btn-outline-danger"
                                @click="clearFilter(columnKey)"
                        >Reset</button>
                    </div>

<!--                    CLOSE BTN-->
                    <div class="col-6">
                        <button type="button" class="btn btn-success"
                                @click="setCurrentFilterDropDown(columnKey)"
                        >Close</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
    name: "AdvanceTableFilter",
    data(){
        return{
            showFilter:false
        }
    },
    props:{
        columnTitle:{ // DISPLAY COLUMN NAME
            required: true,
            type: String,
        },
        columnKey:{ // UNIQUE IDENTIFIER
            required: true,
            type: String
        },
        filterOptions:{ // OPTIONS TO FILTER
            required: true,
            type: Array,
        },
    },
    computed:{
        ...mapGetters({
            getCurrentFilter:"getCurrentFilterDropDown", // TO SHOW OR NOT FILTER DIALOG
            getFilter:"getFilter" // SET ALL SELECTED FILTER
        }),
        filterSelected(){ // GET FILTER SELECTED FOR THIS FORM
            if(!this.getFilter[this.columnKey])
                return []
            return this.getFilter[this.columnKey]
        }
    },
    methods:{
        ...mapActions(({
            setCurrentFilterDropDown:"setCurrentFilterDropDown", // TOGGLE FILTER DIALOG
            setFilter:"setFilter", // ON CB CLICK, UPDATE FILTER
            clearFilter:"clearFilter" // CLEAR ALL FILTER
        })),
        addToFilter(e){ // HELPER FUNCTION
            this.setFilter({
                key:this.columnKey,
                value: e.target.value
            })
        }
    }
}
</script>

<style scoped>
.column-title{
    text-transform: capitalize;
}
</style>