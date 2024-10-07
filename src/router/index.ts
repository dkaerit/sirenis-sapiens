import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: '/',
         component: () => import('../views/Home.vue'),
       },
       {
         path: '/reproductive-system',
         component: () => import('../views/ReproductiveSystem.vue'),
       },
       {
         path: '/gallery',
         component: () => import('../views/Gallery.vue'),
       },
       {
        path: '/mitos-y-leyendas',
        component: () => import('../views/Mitos.vue'),
      },
   ]
});