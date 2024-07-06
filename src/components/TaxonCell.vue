<script setup>
import { defineProps, computed, ref } from 'vue';



// Definir las props
const props = defineProps({
  color: {
    type: String,
    default: '#0000FF'
  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  hover: {
    type: String,
    required: false
  }
});

const grayIntial = "#434343";
const whiteInitial = "#fff"

const color = ref(props.hover? props.hover: props.color);
const bgAlpha = ref(props.hover? 0.25: 0.9);
const borderAlpha = ref(1);
const titleColor = ref(props.hover? grayIntial: whiteInitial);
const textColor = ref(props.hover? grayIntial: "#000");

// Función para convertir color hexadecimal a rgba
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function blendHexColors(color1, color2, weight) {
    function hexToRgb(hex) {
        let bigint = parseInt(hex.slice(1), 16);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        return [r, g, b];
    }

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    let rgb1 = hexToRgb(color1);
    let rgb2 = hexToRgb(color2);

    let blended = rgb1.map((val, i) => Math.round(val * (1 - weight) + rgb2[i] * weight));
    return rgbToHex(...blended);
}

// Computed properties para estilos
const borderColor = computed(() => (hexToRgba(color.value, borderAlpha.value)));
const bgColor = computed(() => (hexToRgba(color.value, bgAlpha.value)));

const handleMouseOver = () => {
  
  color.value = props.hover? blendHexColors(props.color, props.hover, 0.5): props.color;
  console.log(props.hover)
  bgAlpha.value = props.hover? 0.25: 0.7;
  borderAlpha.value = 0.6;
  titleColor.value = props.hover? grayIntial: whiteInitial;
};

const handleMouseLeave = () => {
  color.value = props.hover? props.hover: props.color;
  bgAlpha.value = props.hover? 0.25: 0.9;
  borderAlpha.value = 1;
  titleColor.value = props.hover? grayIntial: whiteInitial;
};
</script>


<template>
  <div class="mx-[3px]" 
  @mouseover="handleMouseOver"
  @mouseleave="handleMouseLeave">
   <div class="inline-block taxon-cell w-full border rounded-lg h-fit overflow-hidden min-w-[115px] transition duration-200" 
   :style="{ borderColor: borderColor }">
     <div class="text-[0.85rem] p-0.5 text-center capitalize transition duration-200" :style="{ backgroundColor: bgColor, color: titleColor }">
       {{ title }}
     </div>
     <div class="text-[0.85rem] p-0.5 text-center" :style="{ color: textColor }">
       {{ text }}
     </div>
   </div>
  </div>
 </template>

<style lang="scss"></style>