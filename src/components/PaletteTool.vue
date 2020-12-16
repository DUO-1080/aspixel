<template>
  <div class="flex items-center">
    <div title="Options" @click="openOptions"
         class="border border-black rounded-sm p-0.5 bg-gray-300  mr-1 cursor-pointer">
      <img class="w-5 h-5 bg-gray-400 hover:bg-transparent" :src="optionsIcon" alt="">
      <ModalContainer :open="isOpenOptions" @close="closeOptions">
        <div :style="{top: `${modalPosition.y + 4}px`, left: `${modalPosition.x}px`}"
             class="absolute w-80 border border-black bg-gray-100 p-0.5 cursor-pointer">
          <div class="bg-gray-300 py-1">
            <div  class="menu-item h-8 leading-8" @click="changePaletteSize(PaletteSize.small)">
              <span class="w-6 inline-block"><span class="ml-2" v-show="paletteSize === PaletteSize.small">✓</span></span>
              {{ PaletteSize.small }}
            </div>
            <div class="menu-item h-8 leading-8" @click="changePaletteSize(PaletteSize.medium)">
              <span class="w-6 inline-block"><span class="ml-2" v-show="paletteSize === PaletteSize.medium">✓</span></span>
              {{ PaletteSize.medium }}
            </div>
            <div class="menu-item h-8 leading-8" @click="changePaletteSize(PaletteSize.large)">
              <span class="w-6 inline-block"><span class="ml-2" v-show="paletteSize === PaletteSize.large">✓</span></span>
              {{ PaletteSize.large }}
            </div>
          </div>
        </div>
      </ModalContainer>
    </div>
    <div title="Presets" @click="openPresets" class="border border-black rounded-sm p-0.5 bg-gray-300 cursor-pointer">
      <img class="w-5 h-5 bg-gray-400 hover:bg-transparent " :src="presetsIcon" alt="">
      <ModalContainer :open="isOpenPresets" @close="closePresets">
        <div :style="{top: `${modalPosition.y + 4}px`, left: `${modalPosition.x}px`}"
             class="absolute w-auto border border-black bg-gray-100 p-0.5 cursor-pointer">
          <div class="bg-gray-300 py-1">
            <PresetPaletteList />
          </div>
        </div>
      </ModalContainer>
    </div>

  </div>
</template>

<script>
import optionsIcon from '../assets/options.svg';
import presetsIcon from '../assets/presets.svg';
import ModalContainer from './ModalContainer.vue';
import PaletteSize from '../static/PaletteSize';
import {computed, ref} from 'vue';
import {useStore} from 'vuex';
import PresetPaletteList from './PresetPaletteList.vue';

export default {
  name: 'PaletteTool',
  components: {PresetPaletteList, ModalContainer},
  setup() {
    const store = useStore();
    const isOpenPresets = ref(false);
    const isOpenOptions = ref(false);

    const modalPosition = ref({
      x: 0,
      y: 0,
    });

    const openPresets = (e) => {
      console.log(e.target.parentElement.getBoundingClientRect().toJSON());
      const rect = e.target.parentElement.getBoundingClientRect();
      modalPosition.value.x = rect.left;
      modalPosition.value.y = rect.bottom;
      isOpenPresets.value = true;
    };

    const closePresets = () => {
      isOpenPresets.value = false;
    };

    const openOptions = (e) => {
      console.log(e.target.parentElement.getBoundingClientRect().toJSON());
      const rect = e.target.parentElement.getBoundingClientRect();
      modalPosition.value.x = rect.left;
      modalPosition.value.y = rect.bottom;
      isOpenOptions.value = true;
    };

    const closeOptions = () => {
      isOpenOptions.value = false;
    };

    const changePaletteSize = (size) => {
      store.commit('setPaletteSize', size)
    }

    return {
      optionsIcon,
      presetsIcon,
      isOpenOptions,
      isOpenPresets,
      openPresets,
      closePresets,
      openOptions,
      closeOptions,
      PaletteSize,
      modalPosition,
      changePaletteSize,
      paletteSize: computed(() => store.state.paletteSize),
    };
  },
};
</script>

<style scoped>
.menu-item:hover {
  background-color: #7c909f;
}
</style>
