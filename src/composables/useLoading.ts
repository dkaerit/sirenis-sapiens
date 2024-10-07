// src/composables/useLoading.ts
import { ref } from 'vue';

const isLoading = ref(false);
const porcentaje = ref(0);

const useLoading = () => {
  const startLoading = () => {
    isLoading.value = true;
    porcentaje.value = 0; // Reinicia el porcentaje al iniciar la carga
  };

  const updateProgress = (value: number) => {
    porcentaje.value = value; // Actualiza el porcentaje
  };

  const stopLoading = () => {
    isLoading.value = false;
    porcentaje.value = 100; // Asigna el 100% al finalizar
  };

  return {
    isLoading,
    porcentaje,
    startLoading,
    updateProgress,
    stopLoading,
  };
};

export default useLoading;
