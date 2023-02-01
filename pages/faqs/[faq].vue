<template>
    <div class="container">
      
     
        <div class="add">
            <Button type="button" class="mybutton mr-2" @click="openBasic()">Add new Question </Button>
            
            <Dialog header="Question and answer field" v-model:visible="displayBasic" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}">
                <div >
                    <p>In Arabic</p> 
                    <div class="flex" style="gap:10px">
                        <InputText  v-model="question" class="myinput"/>
                    <InputText  v-model="answer" class="myinput"/>
                    </div>
                  
                </div>
                <div >
                    <p>In English</p> 
                    <div class="flex" style="gap:10px">
                        <InputText  v-model="question2" class="myinput"/>
                    <InputText  v-model="answer2" class="myinput"/>
                    </div>
                    <p v-if="error" style="color:red">{{ error }}</p>
                </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" @click="closeBasic()" class="p-button-text"/>
                        <Button label="Yes" icon="pi pi-check" @click=" addquestion() " autofocus />
                     
                    </template>
                </Dialog>
        </div>
        <div class="category" v-if="categories">
          <ul v-for="faqq in faqs[0].faq" :key="faqq.id">
              <li >
                  <i class="pi pi-file-edit mybutton mb-2 " @click=" openBasic2(faqq.id ,  faqq.arQuestion , faqq.arAnswer ,faqq.enQuestion , faqq.enAnswer)"></i>
                <i class="pi pi-trash mr-2 mybutton2 mb-2" @click=" confirm1($event , faqq.id)"></i>
                    <Accordion >
                        <AccordionTab>
                    <template #header class="d-flex justify-content-between">
                        <span>{{faqq.arQuestion}}</span>
                      
                    </template>
                    {{ faqq.arAnswer }}
                </AccordionTab>

                </Accordion>

              </li>
          </ul>
          <Dialog header="Edit question" v-model:visible="displayBasic2" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}">
                <div >
                    <h3>In Arabic</h3> 
                    <div >
                        <label for="q1">Question</label>
                        <Textarea  :autoResize="true" rows="5" cols="30"  class="myarea" id="q1" :value="faqobj.editQuestion1"
                                @input="event => faqobj.editQuestion1 = event.target.value" style="direction:rtl" />
                                <label for="a1">Answer</label>
                        <Textarea :autoResize="true" rows="5" cols="30"  class="myarea" id="a1" style="direction:rtl" :value="faqobj.editAnswer1"  @input="event => faqobj.editAnswer1 = event.target.value"/>

                    </div>
                  
                </div>
                <div >
                    <h3>In English</h3> 
                    <div >
                        <label for="q2">Question</label>
                        <Textarea  :autoResize="true" rows="5" cols="30"  id="q2"  class="myarea"  
                        :value="faqobj.editQuestion2"  @input="event => faqobj.editQuestion2 = event.target.value"/>
                        <label for="a2">Answer</label>

                        <Textarea  :autoResize="true" rows="5" cols="30" id="a2" class="myarea"  
                        :value="faqobj.editAnswer2"  @input="event => faqobj.editAnswer2 = event.target.value"/>

                    </div>
                    <p v-if="error" style="color:red">{{ error }}</p>
                </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" @click="closeBasic2()" class="p-button-text"/>
                        <Button label="Yes" icon="pi pi-check" @click="update() " autofocus />
                     
                    </template>
                </Dialog>
      </div>
      <div>
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

      
    </div>
    </div>
  </template>
  

<script setup>

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const route =useRoute() ; 
const id = route.params.faq
const categories = ref()
const faqs = ref()
const selectedfaqs = ref()
async function getdata(){
    categories.value = ""
    const {data} = await useAsyncGql({
    operation : "questions"

}); 
 categories.value= data.value.faqCategories.data ; 
console.log(categories)
 faqs.value= categories.value?.filter(e=>e.id === id )
console.log(faqs)
selectedfaqs.value = faqs.value[0].faq
console.log(selectedfaqs.value)
}

getdata() ; 

const displayBasic = ref(false); 
const openBasic = () => {
    displayBasic.value = true;
};
const closeBasic = () => {
    displayBasic.value = false;
};

const question = ref("")
const answer = ref("");
const question2 = ref("")
const answer2= ref("");
const error = ref("")


async function addquestion(){
    error.value = ""
    if (!question.value || !question2.value || !answer2.value || !answer.value){
        error.value = "please add the empty field"
        return
    }
 const {data} = await useAsyncGql({
    operation : "createfaq" , 
    variables : {arq :question.value , ara:answer.value , enq: question2.value , ena : answer2.value , cid : id  }
 });
 console.log(data.value)
 toast.add({severity:'success', summary:'Added successfuly', detail:'New question has been added', life: 3000});
 getdata();
 closeBasic() 
}
const displayBasic2 = ref(false); 
const faqobj = reactive({
    fid : "" , 
    editQuestion1 : "" , 
    editAnswer1: "" ,
    editQuestion2: "" , 
    editAnswer2: "" , 

})
const openBasic2 = (fid , q1 ,a1 , q2 , a2) => {
    displayBasic2.value = true;
    faqobj.fid = fid
    faqobj.editQuestion1 = q1 
    faqobj.editAnswer1 = a1
    faqobj.editQuestion2 = q2
    faqobj.editAnswer2 = a2


};
const closeBasic2 = () => {
    displayBasic2.value = false;
};


async function update(){
    const {data:updated} = await useAsyncGql({
        operation :"updatefaq" , 
        variables : { arq :faqobj.editQuestion1, ara:faqobj.editAnswer1 , enq: faqobj.editQuestion2 , ena : faqobj.editAnswer2 , cid : id , faqid:faqobj.fid} 
    })
    const success = updated.value.updateFaqBoard.success
   console.log(success)
   toast.add({severity:'success', summary:'Updated successfuly', detail:'The data has been updated', life: 3000});
    getdata();
    closeBasic2();
 
}

async  function Deletefaq(fid){
    const { data:delelted} = await useAsyncGql({
        operation : "deletefaq" , 
        variables : {faqid : fid} 

    });
    const success=  delelted.value.deleteFaqBoard.success
    console.log(success)
    getdata();

}


const confirm = useConfirm();
        const toast = useToast();

        const confirm1 = (event , id) => {
            confirm.require({
                target: event.currentTarget,
                message: 'Are you sure you want to delete this question? ',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    Deletefaq(id)
                    toast.add({severity:'success', summary:'Deleted successfuly', detail:'The question has been deleted', life: 3000});
                },
                reject: () => {
                    console.log("regect")
                }
            });
        };
       


</script>

<style scoped lang="scss">
.category{
    width: 100%;
    ul{
        direction: rtl;
        li{
            width: 100%;
            padding: 1.5rem;
            cursor: pointer;
           
            text-decoration: none;
            color : black ; 
 
            
        }
    }
}
.answer{
    background-color: white;
    transition: all 0.6s ease;
}
.myinput{
    width: 50%;
}
.myarea{
    width: 100%;
    display: block;
}
h3{
    color: $main-color;
    padding:  5px 0 ;
}
label{
    color: #777;
    font-size: 14px;
    font-weight: 500;
}

</style>

