<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
// @ts-ignore
import GalleryDoc from "../docs/gallery.md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Crear una referencia para almacenar si el usuario es mayor de edad
const isAdult = ref(false);
const isDialogOpen = ref(false);
const images = ref<Array<Array<{ src: string; author: string; url?: string }>>>([[]]);
const imagesLoaded = ref(false); // Controla si las imágenes se han cargado

async function loadImages() {
  images.value = [
    [
      { "src": "https://i.imgur.com/BwBwjmZ.jpeg", "author": "@humanoids_091" },
      { "src": "https://i.imgur.com/qHtx0IU.png", "author": "⚠ unreachable" }, 
      { "src": "https://i.imgur.com/NO3COxL.png", "author": "kuma-tori & allmyfavaus (tumblr)" }, // rei
      { "src": "https://i.imgur.com/QFEVWep.png", "author": "@humanoids_091" },
      { "src": "https://i.imgur.com/Lh15ktN.png", "author": "@humanoids_091" },
      { "src": "https://i.imgur.com/29qMASW.png", "author": "@humanoids_091" },
    ],
    [
      { "src": "https://i.imgur.com/OibRMz4.jpeg", "author": "@humanoids_091" },
      { "src": "https://i.imgur.com/hsXAvM7.png", "author": "@humanoids_091" },
      { "src": "https://i.imgur.com/VCeMET8.png", "author": "@humanoids_091" },
      { "src": "https://i.imgur.com/x1RAvpX.png", "author": "@humanoids_091" },
      { "src": "https://i.imgur.com/MJs0hpg.jpeg", "author": "glochan10 (tumblr)", "url": "https://glochan10.tumblr.com/post/97110664607/quick-doodle-for-my-mermaid-au-wait-im" },
    ],
    [
      { "src": "https://i.imgur.com/6yd6miF.png", "author": "sketch: @humanoids_091,  final: @anidiotfish" },
      { "src": "https://i.imgur.com/4H589sY.png", "author": "堀 ボリ (pixiv)" },
      { "src": "https://i.imgur.com/ydC3M4e.png", "author": "@humanoids_091" },
      { "src": "https://i.imgur.com/9atO4oA.jpeg", "author": "@humanoids_091" },
      { "src": "https://i.imgur.com/NV8O08C.png", "author": "@humanoids_091" },
      { "src": "https://i.imgur.com/6cQV5iO.png", "author": "@humanoids_091" },
      
      
    ],
  ];
}

function openDialog() {
  if (isAdult.value != true) isDialogOpen.value = true;
}

function closeDialog() {
  isDialogOpen.value = false;
}

function removeBlurredClass() {
  const blurredImages = document.querySelectorAll("img.blurred");
  blurredImages.forEach((img) => {
    img.classList.remove("blurred");
  });
}

function handleYesClick() {
  isAdult.value = true;
  localStorage.setItem('isAdult', 'true'); // Guardar en localStorage
  removeBlurredClass();
  closeDialog();
}

function handleNoClick() {
  isAdult.value = false;
  localStorage.setItem('isAdult', 'false'); // Guardar en localStorage
  closeDialog();
}

onMounted(async () => {
  // Leer el estado de 'isAdult' desde localStorage
  const storedIsAdult = localStorage.getItem('isAdult');
  if (storedIsAdult === 'true') isAdult.value = true;

  loadImages();
  await nextTick(); // Esperar a que el DOM se actualice

  if(isAdult.value) removeBlurredClass();
  else openDialog();

  // Seleccionar todas las imágenes con la clase "blurred"
  const blurredImages = document.querySelectorAll("img.blurred");

  // Agregar el evento "click" a cada imagen para abrir el diálogo
  blurredImages.forEach((img) => {
    img.addEventListener("click", openDialog);
  });
});

watch([imagesLoaded, isAdult], ([loaded, adult]) => {
  if (loaded && adult) {
    removeBlurredClass();
  }
});

</script>
<template>
  <h1>Anexos: Galería .</h1>
  <div class="md:columns-1 columns-1">
    <GalleryDoc />
    <br/>


    <div class="grid grid-cols-2 md:grid-cols-3 gap-8 masonry-gallery items-start">
         <div v-for="(group, index) in images" :key="index" class="grid gap-4">
            <div v-for="(image, imgIndex) in group" :key="imgIndex" class="image-item">
               <div class="gallery-image overflow-hidden">
                  <img :class="['h-auto max-w-full blurred', { 'rounded-lg': false }]" :src="image.src" alt="Gallery Image">
               </div>
               <center>

                <span v-if="image.url" class="relative z-10 bg-white px-[10px] text-[0.85em] bottom-[2px]">
                  
                  <a :href="image.url">
                    {{ image.author }}
                  </a>

                </span>
                <span v-else class="relative z-10 bg-white px-[10px] text-[0.85em] bottom-[2px]">{{ image.author }}</span>

              </center>
            </div>
        </div>
    </div>


  </div>




  <!-- Dialog de ShadCN -->
  <Dialog v-model:open="isDialogOpen">
    <DialogContent>
      <DialogHeader>
        <b>Confirmación de edad</b>
        <DialogDescription>
          <p>¿Tienes más de 18 años?</p>
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button @click="handleYesClick">Sí</Button>
        <Button variant="outline" @click="handleNoClick">No</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style lang="scss">

/*.masonry-gallery .image-item {
   overflow: hidden;
}*/

img {
  &.blurred {
   filter: blur(20px);
   cursor: pointer;
  }
}

.gallery-image {
   outline: 1px solid #d9d9d9;
   outline-offset: 10px;
}

.masonry-layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-rows: masonry;
  masonry-auto-flow: next ;
}

.envolture-gallery {
  flex-wrap: wrap;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  color: white;
  overflow: hidden;
  cursor: pointer;
}
</style>
