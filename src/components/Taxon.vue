<script setup>
import TaxonCell from "./TaxonCell.vue";
import taxonTree from "./taxonTree.yml";

import { defineProps } from "vue";

// Función para verificar si algo es un array
function isArray(data) {
  return Array.isArray(data);
}

// Función para verificar si algo es un objeto JSON
function isJsonObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}

const props = defineProps({
  node: {
    type: [Array, Object],
    required: true,
  },
  index: {
    type: Number,
    required: false,
  },
});
</script>

<template>
   <template v-if="node">
     <template v-if="isArray(node)">
       <div class="scroll-container">
         <template v-for="(taxon) of node">
           <div class="item 
           max-w-[calc(100vw-215px)] 
           min-w-[127px]
           min-[1150px]:max-w-[calc(100vw-415px)] 
           min-[1384px]:max-w-[calc(100vw-795px)]
           min-[1766px]:max-w-[calc(100vw-1180px)]">
             <Taxon v-if="taxon" :node="taxon" :index="0" />
           </div>
         </template>
       </div>
     </template>
     <template v-else-if="isJsonObject(node)">
         <TaxonCell v-if="node.nombre != '???' && !node.trait" :color="node.color" :title="node.current" :text="node.nombre" :hover="'#808080'"/> 
         <TaxonCell v-else-if="node.nombre != '???'" :color="node.color" :title="node.current" :text="node.nombre"/> 
         <div v-else class="h-[58px] w-[115px] m-[3px]"/>
         <Taxon v-if="node[node.children]" :node="node[node.children]" :index="index+1"/>
     </template>
   </template>
 </template>
 
 <style lang="scss">
 .scroll-container {
   display: flex;
   overflow-x: scroll;
   transform: rotateX(180deg);
 }
 
 .item {
  transform: rotateX(180deg);
 }

 /* Webkit Browsers */
.scroll-container::-webkit-scrollbar {
   height: 10px; /* Altura de la barra de desplazamiento horizontal */
 }
 
 .scroll-container::-webkit-scrollbar-track {
   background: #f8f8f8; /* Color del fondo del track de desplazamiento */
 }
 
 .scroll-container::-webkit-scrollbar-thumb {
   background: #888; /* Color de la barra de desplazamiento */
   border-radius: 10px; /* Bordes redondeados de la barra de desplazamiento */
   border: 3px solid #f8f8f8;
 }
 
 .scroll-container::-webkit-scrollbar-thumb:hover {
   background: #2e2e2e; /* Color de la barra de desplazamiento al pasar el ratón */
   
 }
 </style>