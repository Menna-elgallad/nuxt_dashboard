<template lang="pug">
.container
    chart(type="bar" :data="basicData")

</template>
  
  <script setup lang="ts">
const { data } = await useAsyncGql({
  operation: "MyQuery"
});
console.log("myquery", data);
import { ref } from "vue";
import { useToast } from "primevue/usetoast";

const text = ref();
const toast = useToast();
const greet = () => {
  toast.add({ severity: "info", summary: "Hello " + text.value });
};

const basicData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "#42A5F5",
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: "My Second dataset",
      backgroundColor: "#9CCC65",
      data: [28, 48, 40, 19, 86, 27, 90]
    }
  ]
};
</script>
  
<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
  