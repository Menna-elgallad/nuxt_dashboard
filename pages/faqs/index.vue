<template>
  <div class="container">
    <info title="Questions" subtitle="Categories"/>
<div class="body">
    <div class="add ">
            <Button type="button" class="mybutton mr-2" @click="openBasic()">Add new category</Button>
            
            <Dialog header="Add new Category" v-model:visible="displayBasic" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}">
                
                <div >
                    <p class="my-2">In Arabic</p> 
                    <div  >
                        <InputText  v-model="category1" class="myinput"/>
                    <p class="my-2">In English</p> 

                    <InputText  v-model="category2" class="myinput"/>
                    </div>
                    <p v-if="error" style="color:red">{{ error }}</p>
                </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" @click="closeBasic()" class="p-button-text"/>
                        <Button label="Yes" icon="pi pi-check" @click=" addcategory() " autofocus />
                     
                    </template>
                </Dialog>
        </div>
       
        <Toast />


    <div class="category" v-if="categories">
        <ul v-for="category in categories" :key="category">
            <li >
                <i class="pi pi-check-square successbutton mb-2 " @click="updateactive(category.id , true)"  ></i>
                <i class="pi pi-ban mr-2  falsebutton  mb-2 " @click="updateactive(category.id , false)"  ></i>

                <i class="pi pi-file-edit mr-2 mybutton mb-2" @click="openBasic2(category.id , category.arTitle , category.isActive) "></i>
                <nuxt-link :to="'/faqs/'+category.id" class="flex justify-content-between " :class="{deactivate:!category.isActive}"> 
                    <p>{{category.arTitle}} </p>
                    <p v-if="!category.isActive">DEACTIVATED</p>
                    <i class='pi pi-comments'></i>
            
                </nuxt-link>
            </li>
        </ul>
        <Dialog header="Edit question" v-model:visible="displayBasic2" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}">
                <div >
                    <h3>In Arabic</h3> 
                    <div >
                        <label for="q1">Category</label>
                        <InputText  :autoResize="true" rows="5" cols="30"  class="myarea" id="q1" :value="catobj.artitle"
                                @input="event => catobj.artitle = event.target.value" style="direction:rtl" />

                    </div>
                  
                </div>
                <div >
                    <p v-if="error" style="color:red">{{ error }}</p>
                </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" @click="closeBasic2()" class="p-button-text"/>
                        <Button label="Yes" icon="pi pi-check" @click="edit()" autofocus />
                     
                    </template>
                </Dialog>
    
    </div>
</div>
  </div>
</template>

<script setup> 
// import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
// const confirm = useConfirm();
const toast = useToast();

const categories = ref("")
async function getdata(){
    categories.value = ""

    const {data} = await useAsyncGql({
    operation : "questions"

}); 
console.log(data.value)
categories.value = data.value.faqCategoriesBoard.data.items; 
}
getdata();

const displayBasic = ref(false); 
const openBasic = () => {
    displayBasic.value = true;
};
const closeBasic = () => {
    displayBasic.value = false;
};

const category1 = ref("")
const category2 = ref("")


const error = ref(""); 

async function addcategory(){
    error.value = ""
    if (!category1.value || !category2.value ){
        error.value = "please add the empty field"
        return
    }
 const {data:create} = await useAsyncGql({
    operation : "creatcategory" , 
    variables : {entitle : category2.value , artitile : category1.value  }
 });
 console.log(category1.value)
 console.log(category2.value)
 console.log(create.value)
 toast.add({severity:'success', summary:'Added successfuly', detail:'New category has been added', life: 3000});
 getdata();
 closeBasic() 
}
// const active = ref(true)
async function updateactive(id , active){
    console.log(id , active)
    const {data} = await useAsyncGql({
        operation : "updatecat",
        variables : {catid : id , active : active}
    })
    console.log(data.value)
    toast.add({severity:'success', summary:'Status chaged successfuly', detail:'Activation status been changed', life: 3000});
    getdata();


}

const displayBasic2 = ref(false); 
const catobj = reactive({
    catid : "" , 
    artitle : "" , 
    active : ""
})
const openBasic2 = (cid , c1 ,active) => {
    displayBasic2.value = true;
    catobj.catid = cid;
    catobj.artitle = c1  ; 
    catobj.active = active
  
 
};
const closeBasic2 = () => {
    displayBasic2.value = false;
};
async function edit(){
    const {data:updated} = await useAsyncGql({
        operation :"editcat" , 
        variables : { catid :  catobj.catid  , active: catobj.active , artitle: catobj.artitle} 
    })
    const success = updated.value.updateFaqCategoryBoard.success
   console.log(success)

   toast.add({severity:'success', summary:'Edited successfuly', detail:'The category has been edited', life: 3000});
    getdata();
    closeBasic2();
 
}


</script>

<style lang="scss" scoped >
.category{
    width: 100%;

    ul{
        direction: rtl;
        padding:0.5rem 1.5rem;
        li{
            a{
            width: 100%;
            margin-top: 15px;
            padding: 1.5rem;
            cursor: pointer;
            background-color: $secondary-color;
            border-radius: 1.5rem;
            transition: all 0.6s ease;
            text-decoration: none;
            color : black ; 
            &:hover{
                transform: scale(1.01);
                box-shadow: 0 0 8px 2px #ccc;
            }
            }
          

        }
    }
}
.myinput{
    width: 100%;
}
.deactivate{
opacity: 50%;
transition: none !important;
            text-decoration: none;
            color : black ; 
            &:hover{
                transform: scale(1) !important;
                box-shadow:none !important;

            }
            }
</style>