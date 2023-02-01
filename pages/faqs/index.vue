<template>
  <div class="container">
    <div class="add">
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
        <ConfirmPopup></ConfirmPopup>
        <ConfirmPopup group="demo">
            <template #message="slotProps">
                <div class="flex p-4">
                    <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
                    <p class="pl-2">{{slotProps.message.message}}</p>
                </div>
            </template>
        </ConfirmPopup>
        <Toast />


    <div class="category" v-if="categories">
        <ul v-for="category in categories" :key="category">
            <li >
                <nuxt-link :to="'/faqs/'+category.id" class="flex justify-content-between"> 
                    <p>{{category.arTitle}} </p>
                    <i class='pi pi-comments'></i>
            
                </nuxt-link>
            </li>
        </ul>
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
categories.value = data.value.faqCategories.data ; 
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
                transform: scale(1.05);
            }
            }
          

        }
    }
}
.myinput{
    width: 100%;
}

</style>