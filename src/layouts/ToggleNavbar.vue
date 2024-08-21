<script setup lang="ts">
import { ref } from "vue";

const sidebarState = ref<"open" | "closed">("closed");

const toggleSidebar = () => {
  sidebarState.value = sidebarState.value === "closed" ? "open" : "closed";
};

const menuItems = ref([
  { id: 1, label: "Inicio", route: "/" },
  { id: 2, label: "Sistema reproductor", route: "/reproductive-system" },
  { id: 3, label: "Galería", route: "/gallery" },
]);
</script>

<template>
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
          <RouterLink :to="item.route" @click="toggleSidebar">
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
