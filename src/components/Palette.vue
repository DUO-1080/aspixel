<template>
  <div class="flex-grow w-full bg-indigo-900 border border-black mb-3 shadow-inner rounded-sm"
       style="background-color: #655561">
    <div class="flex flex-wrap">
      <div class="palette-item  relative cursor-pointer border border-black"
           v-for="(color, index) in currentPalette"
           :style="{backgroundColor: color, width: `${width}rem`, height: `${height}rem` }"
           @mousemove="handleHover(color, index)" @mouseleave="handleLeave"
           :key="color" @click="setCurrentColor(color)">
        <div v-if="currentColor.toLowerCase() === color"
             class="selected-cover">
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {computed, ref, watch} from 'vue';
import {useStore} from 'vuex';
import PaletteSize from '../static/PaletteSize';

export default {
  name: 'Palette',
  props: {},
  setup(props) {
    const store = useStore();
    const currentPalette = computed(() => store.state.currentPalette.colors);
    const currentColor = computed(() => store.state.currentColor);
    const paletteSize = computed(() => store.state.paletteSize);

    const setCurrentColor = (color) => {
      store.commit('setColor', color);
    };
    const width = ref(2);
    const height = ref(2);
    watch(paletteSize, (newSize) => {
      if (newSize === PaletteSize.small) {
        width.value = 1.5;
        height.value = 1.5;
      } else if (newSize === PaletteSize.medium) {
        width.value = 2;
        height.value = 2;
      } else if (newSize === PaletteSize.large) {
        width.value = 2.6;
        height.value = 2.6;
      }
    });

    const handleHover = (color, index) => {
      store.commit('setHoverPalette', {color, index});
    };

    const handleLeave = () => store.commit('setHoverPalette', {color: undefined, index: undefined});
    return {
      currentColor,
      currentPalette,
      setCurrentColor,
      handleHover,
      handleLeave,
      paletteSize,
      width,
      height,
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
