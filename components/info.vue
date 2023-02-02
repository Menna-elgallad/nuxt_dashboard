<template>
<div class="info">
      <h3 class="title" >{{title}}</h3>
      <p class="subtitle" v-if="subtitle">{{ subtitle }}</p>
    </div>  
</template>

<script setup>
const props =defineProps({
    title : String , 
    subtitle : {
        type : String , 
        required : false
    }
}) ;
</script>

<style lang="scss">
.info{
  box-shadow:0 0 6px -1px #ccc ; 
  margin-bottom: 10px;
    padding: 1rem;
 border-radius: 1.2rem;


}
.title{
  color: $main-color;
  font-weight: bold;
}
.subtitle{
    margin-top: 5px;
    font-size: 15px;
    color: grey;
}
</style>