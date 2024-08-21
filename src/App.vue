<template>
  <ToggleNavbar>
    <template #content>
      <Wrapper #content>
        <Header title="sirenis sapiens" />
        <div class="m-[40px]">
          <router-view />
        </div>
      </Wrapper>
    </template>
  </ToggleNavbar>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

import ToggleNavbar from "./layouts/ToggleNavbar.vue";
import Wrapper from "./layouts/Wrapper.vue";

import Header from "./components/Header.vue";
import Taxon from "./components/Taxon.vue";

import Main from "@/docs/main.md";
import Evolution from "./docs/evolution.md";

import taxonTree from "./components/taxonTree.yml";

const responsiveDiv = ref(null);
const scrollableDiv = ref(null)

const handleResize = () => {
  if (responsiveDiv.value) {
    const vw = window.innerWidth;
    const containerWidth = responsiveDiv.value.parentElement.clientWidth;
    console.log(`100vw = ${vw}px, 100% = ${containerWidth}px`);
  }
};

const enableDragScrolling = (element) => {
  let isDown = false
  let startX, startY, scrollLeft, scrollTop

  const handleMouseDown = (e) => {
    isDown = true
    startX = e.pageX - element.offsetLeft
    startY = e.pageY - element.offsetTop
    scrollLeft = element.scrollLeft
    scrollTop = element.scrollTop
    element.style.cursor = 'grabbing'
    element.style.userSelect = 'none'
  }

  const handleMouseLeave = () => {
    isDown = false
    element.style.cursor = 'grab'
    element.style.removeProperty('user-select')
  }

  const handleMouseUp = () => {
    isDown = false
    element.style.cursor = 'grab'
    element.style.removeProperty('user-select')
  }

  const handleMouseMove = (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - element.offsetLeft
    const y = e.pageY - element.offsetTop
    const walkX = (x - startX) * 1 // La multiplicación ajusta la velocidad de desplazamiento
    const walkY = (y - startY) * 1 // La multiplicación ajusta la velocidad de desplazamiento
    element.scrollLeft = scrollLeft - walkX
    element.scrollTop = scrollTop - walkY
  }

  const handleTouchStart = (e) => {
    isDown = true
    startX = e.touches[0].pageX - element.offsetLeft
    startY = e.touches[0].pageY - element.offsetTop
    scrollLeft = element.scrollLeft
    scrollTop = element.scrollTop
  }

  const handleTouchEnd = () => {
    isDown = false
  }

  const handleTouchMove = (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.touches[0].pageX - element.offsetLeft
    const y = e.touches[0].pageY - element.offsetTop
    const walkX = (x - startX) * 1 // La multiplicación ajusta la velocidad de desplazamiento
    const walkY = (y - startY) * 1 // La multiplicación ajusta la velocidad de desplazamiento
    element.scrollLeft = scrollLeft - walkX
    element.scrollTop = scrollTop - walkY
  }

  element.addEventListener('mousedown', handleMouseDown)
  element.addEventListener('mouseleave', handleMouseLeave)
  element.addEventListener('mouseup', handleMouseUp)
  element.addEventListener('mousemove', handleMouseMove)

  element.addEventListener('touchstart', handleTouchStart)
  element.addEventListener('touchend', handleTouchEnd)
  element.addEventListener('touchmove', handleTouchMove)

  // Disable dragstart event on images to prevent default behavior
  const images = element.querySelectorAll('img')
  images.forEach(img => img.addEventListener('dragstart', (e) => e.preventDefault()))
}

const enableDragScrollingIfAppropriate = (element) => {
  if ('ontouchstart' in window || navigator.maxTouchPoints) {
    // Es un dispositivo táctil
    element.addEventListener('touchstart', enableDragScrolling)
  } else {
    // No es un dispositivo táctil
    enableDragScrolling(element)
  }
}

onMounted(() => {
  const elements = document.querySelectorAll('.scroll-container')
  elements.forEach(enableDragScrollingIfAppropriate)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>


<style lang="scss">
@font-face {
  font-family: "BeaufortLOL";
  src: url("@/assets/fonts/Beaufort.ttf");
}

@font-face {
  font-family: "BeaufortBold";
  src: url("@/assets/fonts/BeaufortforLOL-Bold.woff");
}

@font-face {
  font-family: "AuxteraCirca";
  src: url("@/assets/fonts/AuxteraCirca.ttf");
}

@font-face {
  font-family: "Gingerbread";
  src: url("@/assets/fonts/Gingerbread.ttf");
}

@import url("https://fonts.googleapis.com/css2?family=Andada+Pro:ital,wght@0,400..840;1,400..840&display=swap");

body {
  background: #060606;
  background-image: url("@/assets/imgs/siren-r.png");
  background-size: 860px;
  background-position-y: -100px;
  font-family: "BeaufortLOL";
  font-size: 1.2rem;
}

@mixin paragraph {
  text-align: justify;
  hyphens: auto;
  font-size: 1.1rem;
  line-height: 17px;
  margin-bottom: 10px;
}

p {
  @include paragraph;
  text-indent: 20px;
}

li {
  @include paragraph;
  p {
    text-indent: 0px;
  }
}

h2 {
  display: inline-block;
  width: 100%;
  font-size: 1.1rem;
  position: relative; /* Para poder posicionar el pseudo-elemento */
  margin: 0px 0px 10px 0px;
  &::after {
    content: ""; /* Contenido del pseudo-elemento */
    position: absolute; /* Posiciona relativo al contenedor */
    left: 0; /* Comienza desde la izquierda */
    right: 0; /* Hasta la derecha */
    bottom: -1px; /* Coloca el underline 3px por debajo del texto */
    height: 1px; /* Grosor del underline */
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.486) 2%,
      rgba(0, 0, 0, 0.486) 70%,
      transparent 100%
    );
    //background-image: linear-gradient(to right, #ffcc00, #ff3300); /* Gradiente de color */
    //background: #000;
  }
  &.broken-em::after {
    display: none; /* O cualquier otro estilo que desees aplicar para corregir el problema */
  }
}

.first {
  p:first-of-type {
    text-indent: 0;

    &::first-letter {
      font-size: 70px;
      float: left;
      padding-right: 10px;
      padding-bottom: 0px;
      padding-top: 9px;
      line-height: 60px;
      font-family: "Gingerbread";
    }
  }
}

em {
  z-index: 1;
  font-style: normal;
  padding: 0px 9px 2px 9px;
  font-size: 0.9em;
  -webkit-hyphens: none;
  hyphens: none;
  outline: 1px solid #8a8a8a;
  top: 0px;
  position: relative;
  outline-offset: -3px;
  border-radius: 8px;
  /*
  &::after {
    content: "";
    //position: absolute;
    //left: 0;
    //bottom: 1.5px;
    //width: 100%;
    //height: calc(100% - 5px);
    //z-index: -1;
    //border: 1px solid #000;
    //border-radius: 6px;
    //box-sizing: border-box;
  }*/
}

h1 {
  font-family: "Andada Pro", serif;
  font-style: italic;
  font-size: 2.25rem;
  font-weight: 200;
  text-shadow: 0px 0.5px, 0.5px 0px, 0.5px 0.5px;
  padding: 5px 15px;
  margin-bottom: 10px;

  text-align: right;
  font-family: "Andada Pro", serif;
  line-height: 1.5;
  font-weight: 400;
}

.imgdoc.float-right {
  float: right;
  margin-left: 10px;
}

.imgdoc.float-left {
  float: left;
  margin-right: 10px;
}

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

.markdown-body {
  p, ul, li {
    break-inside: avoid-column; /* Evitar que se divida dentro de un elemento */
  }
}

code {
  font-style: italic;
  font-family: inherit;
  background: #ededed;
  padding: 2px 25% 2px 0px;
  display: block;
  width: fit-content;
  clip-path: polygon(0 0, 100% 0, calc(100% - 40px) 100%, 0 100%);

  /*&::after {
    content: ""; // Contenido del pseudo-elemento 
    position: absolute; // Posiciona relativo al contenedor 
    left: 0; // Comienza desde la izquierda 
    right: 0; // Hasta la derecha 
    bottom: -1px; // Coloca el underline 3px por debajo del texto 
    height: 1px; // Grosor del underline 
    background: linear-gradient(
      to right,
      transparent 0%,
      rgba(0, 0, 0, 0.486) 2%,
      rgba(0, 0, 0, 0.486) 70%,
      transparent 100%
    );
    //background-image: linear-gradient(to right, #ffcc00, #ff3300); // Gradiente de color 
    //background: #000;
  }*/
}
</style>
