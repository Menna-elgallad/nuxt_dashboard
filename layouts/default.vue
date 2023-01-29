<template>
    <div class="flex"><mymenu/>
        <div class="container">
            <slot/> 
        </div>
   </div>

</template>

<script>
</script>

<style scoped lang="scss">

.container {
  background-color: $secondary_color;
  width: 90%;
  height: 90vh;
  margin: 50px auto;
 border-radius: 1.5rem;
}

</style>