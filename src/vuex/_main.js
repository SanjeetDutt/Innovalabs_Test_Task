import {createStore} from "vuex"

// TO TRANSLATE COLUMN NAME
const translateColumnMeta = (name)=>{
    const translate = {
        id:"id",
        name:"name",
        username:"username",
        email:"email",
        addressStreet:"street",
        addressSuit:"suit",
        addressCity:"city",
        addressZipcode:"zip code",
        addresslat:"latitude",
        addresslng:"longitude",
        phone:"phone",
        website:"website",
        company:"company",
        companyCatchPhrase:"company catch phrase",
        companyBs:"company Bs",
    }
    if(translate[name])
        return translate[name]
    console.error(name, "not found in store")
    return name
}

const store = createStore({

    state(){
        return{
            data:[], // TO STORE DATA FROM API
            columns:[], // TO STORE COLUMN NAMES
            pageSize: 3, // CURRENT PAGE SIZE
            pageNo:0, // CURRENT PAGE NUMBER
            search:null, // CURRENT SEARCH INPUT
            currentFilterDropDown:null, // TO STORE WHICH DD FORM TO SHOW
            filter:{} // FILTER SELECTED
        }
    },

    mutations:{

        // POPULATING DATA ON API CALL
        populateData(state, data){

            const restructureData = data.map(
                e=>{
                    return {
                        id: e.id,
                        name: e.name,
                        username: e.username,
                        email: e.email,
                        addressStreet: e.address.street,
                        addressSuit: e.address.suite,
                        addressCity: e.address.city,
                        addressZipcode: e.address.zipcode,
                        addresslat: e.address.geo.lat,
                        addresslng: e.address.geo.lng,
                        phone: e.phone,
                        website: e.website,
                        company: e.company.name,
                        companyCatchPhrase: e.company.catchPhrase,
                        companyBs: e.company.bs
                    }
                }
            )

            state.data = restructureData
            if(restructureData.length > 0)
                state.columns = Object.keys(restructureData[0])
        },

        // UPDATE THE PAGE SIZE
        updatePageSize(state, pageSize){
            state.pageSize = pageSize < 1 ? 1 : pageSize
        },

        // UPDATE THE PAGINATION
        paginate(state, pageNo){
            state.pageNo = pageNo < 1 ? 0 : pageNo-1
        },

        // UPDATE THE SEARCH
        search(state, value){
            if(!value || value.trim() === "")
                state.search = null
            else
                state.search = value.trim()
        },

        // SETTING WHICH FILTER FORM TO SHOW
        setCurrentFilterDropDown(state, value){
            if(!value || value.trim() === "")
                state.currentFilterDropDown = null
            else
                if(state.currentFilterDropDown === value.trim())
                    state.currentFilterDropDown = null
                else
                    state.currentFilterDropDown = value.trim()
        },

        // SETTTING FILTER. IF ALREADY EXISTS AND REMOVE IT
        setFilter(state,filter){

            if(!filter.value || filter.value.trim() === "")
                return

            const value = filter.value.trim()

            if(!state.filter[filter.key]){
                state.filter[filter.key] = [value]
            } else {
                if(state.filter[filter.key].includes(value)){
                    if(state.filter[filter.key].length < 2)
                        state.filter[filter.key] = []
                    else{
                        const index = state.filter[filter.key].indexOf(value)
                        state.filter[filter.key].splice(index,1)
                    }
                }
                else{
                    state.filter[filter.key].push(value)
                }
            }
        },

        // CLEARING ALL SELECTED FILTER
        clearFilter(state,filter){
            if(state.filter[filter])
                delete state.filter[filter]
        }
    },

    actions:{
        // ON API CALL
        addData(state,data){
            state.commit("populateData", data)
        },

        // ON PAGE SIZE CHANGE => ALSO PAGINATE TO PAGE 1
        updatePageSize(state,data){
            state.commit("updatePageSize", data)
            state.commit("paginate",0)
        },

        // ON PAGINATE
        paginate(state, pageNumber){
            state.commit("paginate",pageNumber)
        },

        // ON SEARCH
        search(state, input){
            state.commit("search",input)
            state.commit("paginate", 0)
        },

        // ON FILTER DROP DOWN
        setCurrentFilterDropDown(state, input){
            state.commit("setCurrentFilterDropDown",input)
        },

        // ON FILTER CHANGE
        setFilter(state,input){
            state.commit("setFilter",input)
        },

        // ON CLEAR FILTER
        clearFilter(state,input){
            state.commit("clearFilter",input)
        }

    },

    getters:{

        // GET FILTERED DATA
        getFilteredData(state){
            return [...state.data]
                .filter(e=>{
                    // CB FILTER
                    let filterSuccess = true
                    Object.keys(state.filter).forEach(key=>{
                        if(filterSuccess && state.filter[key].length > 0 && !state.filter[key].includes(e[key])){
                            filterSuccess = false
                            return false
                        }
                    })

                    if(!filterSuccess)
                        return false

                    // SEARCH FILTER
                    if(state.search === null)
                        return true
                    return Object.values(e).filter(val=>
                        val.toString()
                            .toUpperCase()
                            .includes(state.search.toUpperCase())
                    ).length > 0
                })
        },

        //GET PAGINATED DATA
        getFinalData(state,getter){
            return getter.getFilteredData
                .splice((state.pageNo * state.pageSize),state.pageSize)
        },

        // GET POSIBLE OPTIONS FOR FILTER DD
        getColumnOptions(state){
            const options = {}

            const getFilterOptions = (key)=>{
                const options = []
                state.data.forEach(e=>{
                    const val = e[key]
                    if(val && !options[val])
                        options.push(val)
                })
                return options
            }

            state.columns.forEach(col=>{
                options[col] = getFilterOptions(col)
            })

            return options
        },

        // GET COLUMN META
        getColumnsMeta(state,getter){
            const columnOptions = getter.getColumnOptions

            return state.columns.map(e=>{
                return {
                    key: e,
                    title: translateColumnMeta(e),
                    filterOptions : columnOptions[e]
                }
            })
        },

        // GET CURRENT PAGE SIZE
        getPageSize(state){
            return state.pageSize
        },

        // GET CURRENT PAGINATION LENGTH
        getPagination(state, getter){
            return Math.ceil( getter.getFilteredData.length / state.pageSize )
        },

        // GET CURRENT PAGE NO.
        getPageNumber(state){
            return state.pageNo + 1
        },

        // GET CURRENT DD FORM KEY
        getCurrentFilterDropDown(state){
            return state.currentFilterDropDown
        },

        // GET SELECTED FILTERS
        getFilter(state){
            return state.filter
        }
    },


})

export default store;