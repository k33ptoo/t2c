<template lang="">
  <div class="bg-[#1B1D22] p-4 md:p-2 flex h-screen w-screen justify-items-start flex-col items-center gap-10">
    <div class="md:w-1/2  md:pt-32 pt-16"><img src="./assets/logo.png" alt="logo" class="md:w-1/12 w-1/6"></div>
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