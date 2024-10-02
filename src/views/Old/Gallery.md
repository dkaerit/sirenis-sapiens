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
const images = ref<Array<Array<{ src: string; author: string; url?: string }>>>([[]]);

async function loadImages() {
  images.value = [
    [
      { "src": (await import('../assets/imgs/gallery/fingering-1.jpg')).default, "author": "@humanoids_091" },
      { "src": (await import('../assets/imgs/gallery/sketch-9.png')).default, "author": "⚠ unreachable" }, 
      { "src": (await import('../assets/imgs/gallery/sketch-1.png')).default, "author": "@humanoids_091" },
      { "src": (await import('../assets/imgs/gallery/concept-1.png')).default, "author": "kuma-tori & allmyfavaus (tumblr)" }, // rei
      { "src": (await import('../assets/imgs/gallery/sketch-5.png')).default, "author": "@humanoids_091" },
      { "src": (await import('../assets/imgs/gallery/sketch-3.png')).default, "author": "@humanoids_091" },
    ],
    [
      { "src": (await import('../assets/imgs/gallery/viñeta-1.jpg')).default, "author": "@humanoids_091" },
      { "src": (await import('../assets/imgs/gallery/sketch-2.png')).default, "author": "@humanoids_091" },
      { "src": (await import('../assets/imgs/gallery/sketch-7.png')).default, "author": "@humanoids_091" },
      { "src": (await import('../assets/imgs/gallery/sketch-6.png')).default, "author": "@humanoids_091" },
      { "src": (await import('../assets/imgs/gallery/scene.jpg')).default, "author": "glochan10 (tumblr)", "url": "https://glochan10.tumblr.com/post/97110664607/quick-doodle-for-my-mermaid-au-wait-im" },
    ],
    [
      { "src": (await import('../assets/imgs/gallery/egg-laying-1.png')).default, "author": "sketch: @humanoids_091,  final: @anidiotfish" },
      { "src": (await import('../assets/imgs/gallery/lamia-merman-egg-laying-2.png')).default, "author": "@humanoids_091" },
      { "src": (await import('../assets/imgs/gallery/viñeta-2.jpg')).default, "author": "@humanoids_091" },
      { "src": (await import('../assets/imgs/gallery/sketch-4.png')).default, "author": "@humanoids_091" },
      { "src": (await import('../assets/imgs/gallery/sketch-8.png')).default, "author": "@humanoids_091" },
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

/*function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}*/

onMounted(async () => {
  await loadImages();

  // Leer el estado de 'isAdult' desde localStorage
  const storedIsAdult = localStorage.getItem('isAdult');
  if (storedIsAdult === 'true') {
    isAdult.value = true;
    removeBlurredClass(); // Asegúrate de eliminar el desenfoque si es adulto
  }

  await nextTick(); // Esperar a que el DOM se actualic
  if(!isAdult.value) openDialog();

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
    <GalleryDoc />
    <br/>


    <div class="grid grid-cols-2 md:grid-cols-3 gap-8 masonry-gallery items-start">
         <div v-for="(group, index) in images" :key="index" class="grid gap-4">
            <div v-for="(image, imgIndex) in group" :key="imgIndex" class="image-item">
               <div class="gallery-image overflow-hidden"><img :class="['h-auto max-w-full blurred', { 'rounded-lg': false }]" :src="image.src" alt="Gallery Image"></div>
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
