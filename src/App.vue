<template lang="">
  <div class="bg-[#1B1D22] p-4 md:p-2 flex h-screen w-screen justify-items-start flex-col items-center gap-10">
    <div class="md:w-1/2 flex justify-start w-full"><img src="./assets/logo.png" alt="logo" class="md:w-1/12 w-2/12"></div>
    <Res />
  </div>
</template>
<script>
import Res from './components/Res.vue'
export default {
  components: {
    Res
  },
}
</script>
<style lang="">
  
</style>