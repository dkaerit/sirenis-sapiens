<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const formattedTitle = computed(() => {
  return props.title.split(" ").join(" &#160;&#160;&#160; ");
});
</script>

<template>
   <div :class="[
      'header bg-no-repeat bg-cover',
      'px-10 sm:px-10 md:px-20',
      'pt-24 sm:pt-36',
      'pb-10 sm:pb-[7.5rem]',
    ]">
      <div role="title" 
      v-html="formattedTitle"
      :class="[
         'title break-words text-center text-white mx-auto tracking-[-0.12em]',
         'text-[3.4rem] md:text-[4.9rem]', 
       ]"></div>
       <div class="flex justify-center ">
       <span class="subtitle line-bg-blur max-w-[510px] ">
         Estudio imaginativo de filogenética,
         taxonomía y morfología que busca inventar una configuración sostenible de la
         biología de las sirenas.
       </span>
      </div>
   </div>

</template>

<style lang="scss">
@font-face {
  font-family: "Pistilli";
  src: url("@/assets/fonts/Pistilli.ttf");
}

.header {
  background-image: url("@/assets/imgs/header.gif");
}

.title {
   font-family: "Pistilli";
   position: relative;
   text-shadow: 0px 0px 10px #000;
   line-height: 1em;
   z-index: 2;
}

.subtitle {
  font-family: 'Averia Serif Libre', serif;
}

.line-bg-blur {
   position: relative;
   display: inline-block;
   line-height: 1.05em; /* Ajusta la altura de línea según sea necesario */
   color: white; /* Color del texto */
   z-index: 1; /* Asegura que el texto esté por encima del fondo */
   filter: blur(0.6px);
   text-align: center;
   backdrop-filter: blur(2px);
 }
 
 .line-bg-blur::before {
   content: '';
   position: absolute;
   width: 100%;
   height: 100%;
   background: linear-gradient(to right, transparent 10%, rgba(0, 0, 0, 0.486) 30%, rgba(0, 0, 0, 0.486) 60%, transparent 100%); /* Gradiente horizontal */
   filter: blur(5px); /* Desenfoque */
   z-index: -1; /* Coloca el fondo detrás del texto */
   
   pointer-events: none; /* Permite interactuar con el texto */
 }
</style>
