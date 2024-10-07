<script setup lang="ts">
import Taxon from "../components/Taxon.vue";

// @ts-ignore
import Main from "../docs/main.md";
// @ts-ignore
import Evolution from "../docs/evolution.md";

import taxonTree from "../components/taxonTree.yml";

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
  <h1>Capítulo 1: Introducción .</h1>
  <div class="md:columns-2 columns-1">
    <Main class="first" />
    <Evolution />
  </div>
  <br />

  <div class="max-w-[calc(100vw-70px)] scroll-container" ref="scrollableDiv">
    <div class="item flex min-w-max gap-1">
      <div>
        <Taxon :node="taxonTree" />

      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>
