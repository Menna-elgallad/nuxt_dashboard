<template>
    <div class="container">
     
        <div class="add">
            <Button type="button" class="mybutton mr-2" @click="openBasic()">Add new Question </Button>
            
            <Dialog header="Question and answer field" v-model:visible="displayBasic" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}">
                <div >
                    <p>In Arabic</p> 
                    <div class="flex" style="gap:10px">
                        <InputText  v-model="question"/>
                    <InputText  v-model="answer"/>
                    </div>
                  
                </div>
                <div >
                    <p>In English</p> 
                    <div class="flex" style="gap:10px">
                        <InputText  v-model="question2"/>
                    <InputText  v-model="answer2"/>
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
          <ul v-for="faq in faqs[0].faq" :key="faq">
              <li >
                      
                      <Accordion >
                    <AccordionTab :header="faq.arQuestion">
                        {{faq.arAnswer}}
                    </AccordionTab>
                  
                </Accordion>

                      
                  
                
              </li>
          </ul>
      </div>
    </div>
  </template>
  

<script setup>
const route =useRoute() ; 
const id = route.params.faq
const categories = ref()
const faqs = ref()
const selectedfaqs = ref()
async function getdata(){
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
 getdata();
 closeBasic() 
}

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
</style>

