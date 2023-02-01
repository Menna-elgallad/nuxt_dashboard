<template>
    <div v-if="customers">
        <DataTable :value="customers" :paginator="true" class="p-datatable-customers" :rows="5" 
            dataKey="id" :rowHover="true" v-model:selection="selectedCustomers" v-model:filters="filters" filterDisplay="menu" :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            :globalFilterFields="['enFullName','email', 'age' , 'phone' , 'gender']" responsiveLayout="scroll">
            <template #header>
                <div class="flex justify-content-center align-items-center">
                    <h5 class="px-2">Users </h5>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Search in users" />
                    </span>
                </div>
            </template>
            <template #empty>
                No customers found.
            </template>
            <template #loading>
                Loading customers data. Please wait.
            </template>
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="enFullName" header="Name" sortable style="min-width: 14rem">
                <template #body="{data}">
                    <img src ="@/assets/img/photo-1633332755192-727a05c4013d.jfif" width="30" style="vertical-align: middle ; border-radius: 50%;" class="mr-2" />
                    
                 
                    {{data.enFullName}}
                </template>
               
            </Column>
            <Column field="email" header="Email" sortable filterMatchMode="contains" style="min-width: 14rem">
                <template #body="{data}">
                    
                    <span class="image-text">{{data.email}}</span>
                </template>
           
            </Column>
         
            <Column field="phone" header="Phone" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.phone}}
                </template>
         
            </Column>
            <Column field="genders" header="Gender" style="min-width: 14rem">
                <template #body="{data}">
                    {{data.gender}}
                </template>
                
            </Column>
            <Column  style="min-width: 14rem">
               
            </Column> 
  
           
        </DataTable>
	</div>
</template>

<script setup>
// import { ref, onMounted } from "vue";
// import CustomerService from "@/services/CustomerService";
import { FilterMatchMode, FilterOperator } from "primevue/api";


const customers = ref();
const loading = ref(true);
const regectReason = ref("")

async function getdocreq(){

    const {data:users} = await useAsyncGql({
            operation : "Doctors"
        })
      
            // const data =users
            const data = users.value.consultantsBoard.data.items
            const selected = data.filter(e => e.requestType === "JOIN_REQUEST")
            customers.value = selected;
            customers.value = data;
            console.log("cust" , customers.value)
            customers.value.forEach(
                (customer) => (customer.date = new Date(customer.date))
            );
            loading.value = false;
    
}

getdocreq() ; 
const selectedCustomers = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    "enFullName": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "email": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    

    "age": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    "phone": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS },
});


        


</script>

<style lang="scss" scoped>
img {
    vertical-align: middle;
}
::v-deep(.p-paginator) {
    .p-paginator-current {
        margin-left: auto;
    }
}

::v-deep(.p-progressbar) {
    height: .5rem;
    background-color: #D8DADC;

    .p-progressbar-value {
        background-color: #607D8B;
    }
}

::v-deep(.p-datepicker) {
    min-width: 25rem;

    td {
        font-weight: 400;
    }
}

::v-deep(.p-datatable.p-datatable-customers) {
    .p-datatable-header {
        padding: 1rem;
        text-align: left;
        font-size: 1.5rem;
    }

    .p-paginator {
        padding: 1rem;
    }

    .p-datatable-thead > tr > th {
        text-align: left;
    }

    .p-datatable-tbody > tr > td {
        cursor: auto;
    }

    .p-dropdown-label:not(.p-placeholder) {
        text-transform: uppercase;
    }
}
</style>