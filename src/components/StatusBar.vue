<template>
  <div class="h-full flex items-center justify-between" style="color: #2e3234">
    <div class="flex items-center">
      <div class=" ml-4 flex items-center mr-4">
        <img class="w-4 h-4 mr-3" :src="squareIcon" alt="">
        <span class="text-lg mr-2">{{ canvasSpec.w }} </span>
        <span class="text-lg"> {{ canvasSpec.h }} </span>
      </div>

      <div v-if="point.x !== undefined" class=" ml-4 flex items-center mr-6">
        <img class="w-4 h-4 mr-3" :src="pointIcon" alt="xy point">
        <span class="text-lg mr-2">{{ point.x }} </span>
        <span class="text-lg"> {{ point.y }} </span>
      </div>

      <div v-else-if="hoverPalette.color !== undefined" class=" ml-4 flex items-center mr-6">
        <div class="w-10 h-5 mr-3 rounded border border-black" :style="{backgroundColor: hoverPalette.color}"></div>
        <span class="text-lg mr-2"> Index {{ hoverPalette.index }} </span>
        <span class="text-lg ">{{ hoverPalette.color }} </span>
      </div>

      <div v-else class="ml-4 flex items-center mr-6">
          <div class="text-lg">{{ canvasName }}</div>
      </div>


    </div>
    <div class="text-lg mr-2"> scale: {{ `${zoom}00%` }}</div>
  </div>
</template>

<script>
import {computed} from 'vue';
import {useStore} from 'vuex';
import pointIcon from '../assets/point.svg';
import squareIcon from '../assets/square.svg';

export default {
  name: 'StatusBar',
  setup() {
    const store = useStore();

    return {
      zoom: computed(() => store.state.zoom),
      point: computed(() => store.state.point),
      canvasSpec: computed(() => store.state.canvasSpec),
      hoverPalette: computed(() => store.state.hoverPalette),
      canvasName: computed(() => store.state.canvasName),
      pointIcon,
      squareIcon,
    };
  },
};
</script>

<style scoped>

</style>
