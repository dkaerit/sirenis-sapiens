<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
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
const images = ref<Array<{ src: string; author: string }>>([]);

async function loadImages() {
  images.value = [
    { "src": (await import('../assets/imgs/gallery/egg-laying-1.png')).default, "author": "@humanoids_091" },
    { "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg", "author": "Autor 1" },
    { "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg", "author": "Autor 3" },
    { "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg", "author": "Autor 4" },
    { "src": (await import('../assets/imgs/gallery/viñeta-1.jpg')).default, "author": "@humanoids_091" },
    { "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg", "author": "Autor 6" },
    { "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg", "author": "Autor 7" },
    { "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg", "author": "Autor 8" },
    { "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg", "author": "Autor 9" },
    { "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg", "author": "Autor 10" },
    { "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg", "author": "Autor 11" },
    { "src": "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg", "author": "Autor 12" }
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

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

onMounted(async () => {
  await loadImages();

  // Leer el estado de 'isAdult' desde localStorage
  const storedIsAdult = localStorage.getItem('isAdult');
  if (storedIsAdult === 'true') {
    isAdult.value = true;
    removeBlurredClass(); // Asegúrate de eliminar el desenfoque si es adulto
  }

  await nextTick(); // Esperar a que el DOM se actualice

  // Seleccionar todas las imágenes con la clase "blurred"
  const blurredImages = document.querySelectorAll("img.blurred");

  // Agregar el evento "click" a cada imagen para abrir el diálogo
  blurredImages.forEach((img) => {
    img.addEventListener("click", openDialog);
  });
});
</script>
<template>
  <h1>Anexos: Galería .</h1>
  <div class="md:columns-1 columns-1">
    <GalleryDoc class="first" />


    <div class="grid grid-cols-2 md:grid-cols-3 gap-8 masonry-gallery">
         <div v-for="(group, index) in chunkArray(images, 4)" :key="index" class="grid gap-4">
            <div v-for="(image, imgIndex) in group" :key="imgIndex" class="image-item">
               <div class="gallery-image overflow-hidden"><img :class="['h-auto max-w-full blurred', { 'rounded-lg': false }]" :src="image.src" alt="Gallery Image"></div>
               <center><span class="relative z-10 bg-white px-[10px] text-[0.85em] bottom-[2px]">{{ image.author }}</span></center>
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
