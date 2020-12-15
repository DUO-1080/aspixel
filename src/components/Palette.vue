<template>
  <div class="flex-grow w-full bg-indigo-900">
    <div class="flex flex-wrap">
      <div class="palette-item w-8 h-8 relative cursor-pointer border border-black" v-for="color in currentPalette"
           :style="{backgroundColor: color}" :key="color" @click="setCurrentColor(color)">
        <div v-if="currentColor.toLowerCase() === color"
            class="selected-cover">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import palettes from '../assets/PresetPalettes';
import {computed, ref, watch} from 'vue';
import {useStore} from 'vuex';

export default {
  name: 'Palette',
  props: {

  },
  setup(props) {
    const store = useStore();
    const currentPalette = computed(() => store.state.currentPalette);
    const currentColor
        = computed(() => store.state.currentColor);

    // watch(currentColor
    //     , () => {
    //       console.log('watch currentColor' +
    //           ' change: ', currentColor.value);
    //     });

    const setCurrentColor = (color) => {
      store.commit('setColor', color)
    }
    return {
      currentColor,
      currentPalette,
      setCurrentColor
    };
  },
};
</script>

<style scoped>
.palette-item:hover {
  border: 1px solid white;
}
.selected-cover {
  z-index: 100;
  border: 3px solid white;
  background-color: transparent;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
