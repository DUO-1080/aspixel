<template>
  <div class="">
    <div class="palette-item p-2" v-for="palette in PresetPalettes" @click="store.commit('setPalette', palette)"
         :title=" palette.author && `author: ${palette.author}`">
      <p>{{ palette.name }}</p>
      <div class="flex flex-nowrap">
        <div class="" v-for="color in palette.colors">
          <div class="w-4 h-4" :style="{backgroundColor: color}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PresetPalettes from '../assets/PresetPalettes';
import {useStore} from 'vuex';

export default {
  name: 'PresetPaletteList',
  setup() {
    const store = useStore();
    return {
      PresetPalettes,
      store,
    };
  },
};
</script>

<style scoped>
.palette-item:hover {
  background-color: #7c909f;
}

.palette-item {
  color: #2e3234;

}
</style>
