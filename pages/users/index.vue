<template>
    <div >
        <DataTable v-if="customers" :value="customers" :paginator="true" class="p-datatable-customers" :rows="5" 
            dataKey="id" :rowHover="true" v-model:selection="selectedCustomers" v-model:filters="filters" filterDisplay="menu" :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            :globalFilterFields="['user.enFullName','user.email', 'user.age' , 'user.phone' , 'user.gender']" responsiveLayout="scroll">
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
            <Column field="user.enFullName" header="Name" sortable style="min-width: 14rem">
                <template #body="{data}">
                    <img src ="@/assets/img/photo-1633332755192-727a05c4013d.jfif" width="30" style="vertical-align: middle ; border-radius: 50%;" class="mr-2" />
                 
                    {{data.user.enFullName}}
                </template>
               
            </Column>
            <Column field="user.email" header="Email" sortable filterMatchMode="contains" style="min-width: 14rem">
                <template #body="{data}">
                    
                    <span class="image-text">{{data.user.email}}</span>
                </template>
               
            </Column>
            
            <Column field="user.phone" header="Phone" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.user.phone}}
                </template>
         
            </Column>
            <Column field="user.genders" header="Gender" style="min-width: 14rem">
                <template #body="{data}">
                    {{data.user.gender}}
                </template>
                
            </Column>
            <Column  style="min-width: 14rem">
                <template #body="{data}">
                    <Button type="button" class="mybutton mr-2" @click="accept(data.id)">Accept</Button>
                    <Button label="Regect"  class="mybutton2 mr-2" @click="openBasic" />
                <Dialog header="Reason for regection" v-model:visible="displayBasic" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}">
                    <InputText class="w-100" v-model="regectReason"/>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" @click="closeBasic()" class="p-button-text"/>
                        <Button label="Yes" icon="pi pi-check" @click="closeBasic() ; Regect(data.id)" autofocus />
                    </template>
                </Dialog>
                </template>
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
            operation : "getUser"
        })
      
            // const data =users
            const data = users.value.consultantRequestsBoard.data.items
            const selected = data.filter(e => e.requestType === "JOIN_REQUEST")
            customers.value = selected;
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
            "user.enFullName": {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
            },
            "user.email": {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
            },
            
 
           "user.age": {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
            },
            "user.phone": {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
            },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: FilterMatchMode.EQUALS },
        });

        async function accept (id){
            const {data:message } = await useAsyncGql({
            operation: "accept" , 
            variables : {"id" : id , "status" : "APPROVED"}
        }) ; 
            console.log(message.value)
            getdocreq();
        } ;
        const displayBasic = ref(false); 
        const openBasic = () => {
            displayBasic.value = true;
        };
        const closeBasic = () => {
            displayBasic.value = false;
        };
        async function Regect (id){
            const {data:message2 } = await useAsyncGql({
            operation: "Regect" , 
            variables : {"id" : id , "status" : "REJECTED" ,"reason" : regectReason.value }
        })
        console.log(message2.value)
        getdocreq();
    }
        


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