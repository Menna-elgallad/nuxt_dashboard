<template>
  <div class="container">
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
const {data} = await useAsyncGql({
    operation : "questions"

}); 
console.log(data.value)
const categories = data.value.faqCategories.data ; 


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
</style>