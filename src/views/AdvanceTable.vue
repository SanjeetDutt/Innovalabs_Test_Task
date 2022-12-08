<template>

<!--    SEARCH START-->
    <div class="row mb-3 mt-3">
        <div class="ms-auto col-auto">
            <input class="form-control" placeholder="Search" type="text"
                   @input="searchInput"
            >
        </div>
    </div>
<!--    SEARCH COMPLETE-->

<!--    TABLE START-->
    <div class="table-container">
        <table class="table table-striped table-bordered">

<!--            TABLE HEADING-->
            <thead>

            <tr>
                <th v-for="(meta,i) in getColumnMeta" :key="i">
                    <advance-table-filter :column-title="meta.title" :column-key="meta.key"
                                          :filter-options="meta.filterOptions"
                    />
                </th>
            </tr>

            </thead>

<!--            TABLE BODY-->
            <tbody class="table-group-divider">

<!--            IF DATA EXISTS-->
            <template v-if="getFinalData.length > 0">
                <tr v-for="(item, i) in getFinalData" :key="i">
                    <td v-for="(meta,j) in getColumnMeta" :key="j">
                        {{item[meta.key]}}
                    </td>
                </tr>
            </template>

<!--            DEFAULT MESSAGE -->
            <template v-else>
                <tr>
                    <td :colspan="getColumnMeta.length">
                        <h5>No Data found</h5>
                    </td>
                </tr>
            </template>
            </tbody>


        </table>
    </div>
<!--    TABLE COMPLETE-->

<!--    PAGE SIZE AND PAGINATION START-->
    <div class="row mt-3">
<!--        PAGE SIZE-->
        <div class="col-6 col-lg-2">
            <div class="row">
                <label for="pageSize" class="col-sm-6 col-form-label right">Page size : </label>
                <div class="col-sm-6">
                    <input class="form-control" placeholder="Page Size"
                           :value="getPageSize" id="pageSize" min="1"
                           type="number" @input="changePageSize">
                </div>
            </div>
        </div>

<!--PAGINATION-->
        <div class="ms-auto col-auto">
            <template v-for="page in getPagination" :key="page">
                <button class="mx-2 btn "
                      :class="getPageNumber === page ? 'btn-primary' : 'btn-outline-primary'"
                      style="cursor: pointer" @click="paginate(page)">
                    {{page}}
                </button>
            </template>
        </div>
    </div>
<!--    PAGE SIZE AND PAGINATION COMPLETE-->

</template>

<script>

/**
 * Features to include
 * 1. Pagination - done
 * 2. Search - done
 * 3. filter -done
 */

import {mapActions, mapGetters} from "vuex"
import AdvanceTableFilter from "@/components/AdvanceTableFilter.vue";
export default {
    name: "AdvanceTable",
    components: {AdvanceTableFilter},
    methods:{
        ...mapActions({
            addData: "addData", //ADD DATA AFTER API CALL
            updatePageSize: "updatePageSize", // ON PAGE SIZE CHANGE
            paginate:"paginate", // ON PAGINATE
            search:"search" // ON SEARCH
        }),
        changePageSize(e){ // HELPER FUNCTION
            this.updatePageSize(e.target.value)
        },
        searchInput(e){ // HELPER FUNCTION
            this.search(e.target.value)
        }
    },
    computed:{
        ...mapGetters({
            getFinalData:"getFinalData", // FINAL FILTERED DATA
            getColumnMeta: "getColumnsMeta", // COLUMN META WITH FILTER OPTIONS
            getPageSize:"getPageSize", // CURRENT PAGE SIZE
            getPagination: "getPagination", // CURRENT PAGINATION LENGTH EX. 3,4,ETC
            getPageNumber:"getPageNumber" // CURRENT PAGE NUMBER
        })
    },
    created(){
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(res => this.addData(res) )
    }
}
</script>

<style scoped>
.table-container{
    max-width: 100%;
    height: 80vh;
    overflow: auto;
}
</style>