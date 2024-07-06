<script setup lang="ts">
import Taxon from "../components/Taxon.vue";

import Main from "../docs/main.md";
import Evolution from "../docs/evolution.md";
import taxonTree from "../components/taxonTree.yml";
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
