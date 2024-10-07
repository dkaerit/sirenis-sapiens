<script setup lang="ts">
// @ts-ignore
import ReproductiveSystemDoc from "../docs/reproductive-system.md";

/* loading bar */
import { onMounted } from "vue";
import useLoading from "@/composables/useLoading"; 
const { startLoading, stopLoading } = useLoading();
onMounted(async () => {
  startLoading(); // Comienza a cargar
  stopLoading(); // Detiene la carga
});
</script>

<template>
   <h1>Capítulo 2: Sistema reproductor .</h1>
   <div class="md:columns-2 columns-1">
      <ReproductiveSystemDoc class="first"/>
   </div>
</template>

<style lang="scss"></style>