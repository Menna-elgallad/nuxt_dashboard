
<template>
    <div v-if="customers">
        <DataTable :value="customers" :paginator="true" class="p-datatable-customers" :rows="5" 
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
                    <img :src =" 'https://staging-api.tatmeen.sa/' +data.user.profilePicture" width="30" style="vertical-align: middle" />
                 
                    {{data.user.enFullName}}
                </template>
                <!-- <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                </template> -->
            </Column>
            <Column field="user.email" header="Email" sortable filterMatchMode="contains" style="min-width: 14rem">
                <template #body="{data}">
                    
                    <span class="image-text">{{data.user.email}}</span>
                </template>
                <!-- <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by country"/>
                </template> -->
            </Column>
            <!-- <Column field="user.age" header="Age" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.user.age}}
                </template>
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                </template>
            </Column> -->
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
                <template #body>
                    <Button type="button" class="mybutton mr-2">Accept</Button>
                    <Button type="button" class="mybutton2">Regect</Button>

                </template>
            </Column> 
            <!-- <Column header="Agent" sortable filterField="representative" sortField="representative.name" :showFilterMatchModes="false" :filterMenuStyle="{'width':'14rem'}" style="min-width: 14rem">
                <template #body="{data}">
                    <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" width="30" style="vertical-align: middle" />
                    <span class="image-text">{{data.representative.name}}</span>
                </template>
                <template #filter="{filterModel}">
                    <div class="mb-3 font-bold">Agent Picker</div>
                    <MultiSelect v-model="filterModel.value" :options="representatives" optionLabel="name" placeholder="Any" class="p-column-filter">
                        <template #option="slotProps">
                            <div class="p-multiselect-representative-option">
                                <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" width="30" style="vertical-align: middle" />
                                <span class="image-text">{{slotProps.option.name}}</span>
                            </div>
                        </template>
                    </MultiSelect>
                </template>
            </Column> -->
            <!-- <Column field="date" header="Date" sortable dataType="date" style="min-width: 8rem">
                <template #body="{data}">
                    {{formatDate(data.date)}}
                </template>
                <template #filter="{filterModel}">
                    <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                </template>
            </Column>
            <Column field="balance" header="Balance" sortable dataType="numeric" style="min-width: 8rem">
                <template #body="{data}">
                    {{formatCurrency(data.balance)}}
                </template>
                <template #filter="{filterModel}">
                    <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
                </template>
            </Column>
            <Column field="status" header="Status" sortable :filterMenuStyle="{'width':'14rem'}" style="min-width: 10rem">
                <template #body="{data}">
                    <span :class="'customer-badge status-' + data.status">{{data.status}}</span>
                </template>
                <template #filter="{filterModel}">
                    <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any" class="p-column-filter" :showClear="true">
                        <template #value="slotProps">
                            <span :class="'customer-badge status-' + slotProps.value">{{slotProps.value}}</span>
                        </template>
                        <template #option="slotProps">
                            <span :class="'customer-badge status-' + slotProps.option">{{slotProps.option}}</span>
                        </template>
                    </Dropdown>
                </template>
            </Column>
           
-->
            <!-- <Column field="activity" header="Activity" sortable :showFilterMatchModes="false" style="min-width: 10rem">
                <template #body="{data}">
                    <ProgressBar :value="data.activity" :showValue="false" />
                </template>
                <template #filter="{filterModel}">
                    <Slider v-model="filterModel.value" range class="m-3"></Slider>
                    <div class="flex align-items-center justify-content-between px-2">
                        <span>{{filterModel.value ? filterModel.value[0] : 0}}</span>
                        <span>{{filterModel.value ? filterModel.value[1] : 100}}</span>
                    </div>
                </template>
            </Column> -->
           
        </DataTable>
	</div>
</template>

<script setup>
// import { ref, onMounted } from "vue";
// import CustomerService from "@/services/CustomerService";
import { FilterMatchMode, FilterOperator } from "primevue/api";
         const customers = ref();

         const loading = ref(true);

        const {data} = await useAsyncGql({
            operation : "getUser"
        })
      
            // const data =users
            console.log(data.value.consultantRequestsBoard.data.items)
            customers.value = data.value.consultantRequestsBoard.data.items;
            console.log("cust" , customers.value)
            customers.value.forEach(
                (customer) => (customer.date = new Date(customer.date))
            );
            loading.value = false;
    
        
        
     
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
            
            // representative: { value: null, matchMode: FilterMatchMode.IN },
            // date: {
            //     operator: FilterOperator.AND,
            //     constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
            // },
           "user.age": {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
            },
            "user.phone": {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
            },
            // status: {
            //     operator: FilterOperator.OR,
            //     constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
            // },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: FilterMatchMode.EQUALS },
        });
        // const customerService = ref(new CustomerService());
        const representatives = [
            { name: "Amy Elsner", image: "amyelsner.png" },
            { name: "Anna Fali", image: "annafali.png" },
            { name: "Asiya Javayant", image: "asiyajavayant.png" },
            { name: "Bernardo Dominic", image: "bernardodominic.png" },
            { name: "Elwin Sharvill", image: "elwinsharvill.png" },
            { name: "Ioni Bowcher", image: "ionibowcher.png" },
            { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
            { name: "Onyama Limba", image: "onyamalimba.png" },
            { name: "Stephen Shaw", image: "stephenshaw.png" },
            { name: "XuXue Feng", image: "xuxuefeng.png" },
        ];
        const statuses = ref([
            "unqualified",
            "qualified",
            "new",
            "negotiation",
            "renewal",
            "proposal",
        ]);
        const formatDate = (value) => {
            return value.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            });
        };
        const formatCurrency = (value) => {
            return value.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            });
        };


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