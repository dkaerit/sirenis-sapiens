<script setup>
import { ref } from 'vue';

const scrollContainer = ref(null);

const handleScroll = (event) => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollTop += event.deltaY;
  }
};
</script>

<template>
  <div
    class="m-0 p-0 border-0 text-base font-inherit align-baseline float-right 
    border-l h-screen bg-white border-[#161616] 
    max-w-[1150px] overflow-hidden"
    @wheel="handleScroll" 
  >
  <div class="overflow-auto h-full" ref="scrollContainer">
    <slot name="content"></slot>
   </div>
  </div>
</template>

