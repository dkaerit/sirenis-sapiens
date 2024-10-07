<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import useLoading from "@/composables/useLoading"; 


const sidebarState = ref<"open" | "closed">("closed");
const route = useRoute(); // Obtiene la ruta actual
const { isLoading } = useLoading();

const toggleSidebar = () => {
  sidebarState.value = sidebarState.value === "closed" ? "open" : "closed";
};

const handleLinkClick = (routeTo: string) => {
  if (route.path !== routeTo) isLoading.value = true; // Activar el spinner
  toggleSidebar();
};

const menuItems = ref([
  { id: 1, label: "Inicio", route: "/" },
  { id: 2, label: "Sistema reproductor", route: "/reproductive-system" },
  { id: 3, label: "Mitos y leyendas", route: "/mitos-y-leyendas" },
  { id: 3, label: "Galería", route: "/gallery" },

]);

</script>

<template>
    <div v-if="isLoading" class="absolute h-screen w-screen z-50 flex justify-center items-center bg-black/85 backdrop-blur-sm">
      <div class="w-[200px]">
        <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
      </div>
    </div>

  <nav
    class="fixed top-0 z-50 w-full bg-black border-b border-[#161616] bg-opacity-60 backdrop-blur-md text-white dark:bg-gray-800"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div role="toggle-menu-trigger" class="flex">
          <button
            @click="toggleSidebar"
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="flex-none items-center p-2 text-sm rounded-lg hover:bg-opacity-60 hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-800"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              strokewidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
            >
              <path
                d="M3 5H11"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M3 12H16"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M3 19H21"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </button>
        </div>
        <div class="flex justify-center w-screen ">
          <div role="rotating-dice" class="dice" title="atrás" />
        </div>
        
        <div class="w-10 sm:w-0"></div>
      </div>
    </div>
  </nav>

  <div
    role="overlay"
    @click="toggleSidebar"
    :data-state="sidebarState"
    :class="[
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 transition-all',
      { invisible: sidebarState === 'closed' },
    ]"
    style="pointer-events: auto"
    :data-aria-hidden="sidebarState == 'closed' ? true : false"
    :aria-hidden="sidebarState == 'closed' ? true : false"
  ></div>
  <aside
    role="dialog"
    :data-state="sidebarState"
    id="logo-sidebar"
    :class="[
      'data-[state=closed]:animate-out data-[state=closed]:duration-700 data-[state=closed]:slide-out-to-left data-[state=closed]:-left-full',
      'data-[state=open]:animate-in data-[state=open]:duration-500 data-[state=open]:slide-in-from-left',
      'z-50 fixed top-0 left-0 z-40 h-screen transition-all ease-in-out gap-4 p-6 inset-y-0 w-3/4 border-r sm:max-w-sm pr-0',
      'bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700',
    ]"
    aria-label="Sidebar"
  >
    <button
      @click="toggleSidebar"
      type="button"
      data-drawer-hide="drawer-navigation"
      aria-controls="drawer-navigation"
      class="right-4 top-4 absolute rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-xicon w-4 h-4 text-muted-foreground"
      >
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
      </svg>
      <span class="sr-only">Close menu</span>
    </button>
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li v-for="item in menuItems" :key="item.id">
          <RouterLink :to="item.route" @click="handleLinkClick(item.route)" exact>
            <span class="ms-3">{{ item.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>

  <div class="">
    <slot name="content" />
  </div>
</template>

<style lang="scss">
.dice {
  width: 35px;
  height: 35px;
  background: url("@/assets/imgs/dice.png");
  background-size: cover;
  -webkit-animation: rotating 6s linear infinite;
  -moz-animation: rotating 6s linear infinite;
  -ms-animation: rotating 6s linear infinite;
  -o-animation: rotating 6s linear infinite;
  animation: rotating 6s linear infinite;
}

// keyframes
@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
