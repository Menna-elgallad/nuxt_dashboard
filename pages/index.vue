<template >
<div style="width:100vw" >
  <loadingbar :duration="1000" />
  <!-- <chart type="bar" :data="basicData"/> -->
  

</div>

</template>
  
<script setup lang="ts">

const route = useRouter()
 onMounted(async function check(){

  const tokenlocal= usetoken()
  console.log( "local" , window.localStorage.getItem("token") )
  const token = tokenlocal.value|| window.localStorage.getItem("token") 
  console.log("token :", token)
  useGqlToken(token)
  const { data } =  await useAsyncGql({
      operation: "check"
  });
  const check = data.value?.me.message
  console.log(check)
  if (check ==="Operation done successfully"  ){
    if (window.localStorage.getItem("save") === "false"){
        window.localStorage.removeItem("token")
      }
    return
  }
  else if (!token){
    route.push("login")
    
  } 

})



</script>
  
<style lang="scss">

</style>
  