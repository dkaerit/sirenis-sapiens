<script setup lang="ts">
// @ts-ignore
import Main from "../docs/main.md";
// @ts-ignore
import Mitos from "../docs/myths.md";

/* loading bar */
import useLoading from "@/composables/useLoading"; 
import { onMounted } from "vue";
const { startLoading, stopLoading } = useLoading();
onMounted(async () => {
  startLoading(); // Comienza a cargar
  stopLoading(); // Detiene la carga
});
</script>

<template>
  <h1>La Génesis de los Hijos del Mar: El Mito de Origen de los Sirenos .</h1>
  <div class="md:columns-2 columns-1">
    <Mitos />
  </div>
  <br />
</template>

<style lang="scss"></style>
