<template>
  <div class="flex justify-end mx-3 flex-nowrap flex-grow items-center">
    <div title="Save" @click="openSaveMenu"
         class="border border-black rounded-sm p-0.5 bg-gray-300  mr-1 cursor-pointer">
      <img class="w-5 h-5 bg-gray-400 hover:bg-transparent" :src="downloadIcon" alt="">
      <ModalContainer :open="isOpenSaveMenu" @close="closeSaveMenu">
        <div :style="{top: `${modalPosition.y + 7}px`, left: `calc(${modalPosition.x}px - 10rem)`}"
             class="absolute w-40 border border-black bg-gray-100 p-0.5 cursor-pointer">
          <div class="bg-gray-300 py-0.5">
            <div class="menu-item px-3 h-8 leading-8" @click="saveToJson">
              Save to local file
            </div>
            <div class="menu-item px-3 h-8 leading-8" @click="saveToImage('png')">
              Save to png
            </div>
            <div class="menu-item px-3 h-8 leading-8" @click="saveToImage('jpg')">
              Save to jpg
            </div>
          </div>
        </div>
      </ModalContainer>
    </div>
    <div title="Fullscreen" @click="handleFullScreen"
         class="border border-black rounded-sm p-0.5 bg-gray-300 cursor-pointer">
      <img class="w-5 h-5 bg-gray-400 hover:bg-transparent" :src="fullscreenIcon" alt="">
    </div>
  </div>
</template>

<script>
import downloadIcon from '../assets/download.svg';
import fullscreenIcon from '../assets/full-screen.svg';
import canvasToImage from 'canvas-to-image';
import ModalContainer from './ModalContainer.vue';
import FileSaver from 'file-saver';
import screenfull from 'screenfull';
import {ref} from 'vue';
import {useStore} from 'vuex';

export default {
  name: 'Menu',
  components: {ModalContainer},
  setup() {
    const store = useStore();
    const isOpenSaveMenu = ref(false);
    const modalPosition = ref({
      x: 0,
      y: 0,
    });

    const openSaveMenu = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      console.log(e.currentTarget.getBoundingClientRect());
      modalPosition.value = {
        x: rect.right,
        y: rect.bottom,
      };
      isOpenSaveMenu.value = true;
    };

    const closeSaveMenu = () => {
      isOpenSaveMenu.value = false;
    };

    const saveToImage = (type) => {
      const element = document.getElementById('canvas');
      canvasToImage(element, {
        name: store.state.canvasName,
        type: type,
        quality: 1,
      });
    };

    const saveToJson = () => {
      const object = {
        ...store.state,
        data: document.getElementById('canvas').
            getContext('2d').
            getImageData(0, 0, store.state.canvasSpec.w, store.state.canvasSpec.h),
      };
      console.log(object.data);

      const blob = new Blob([JSON.stringify(object)], {type: 'text/plain;charset=utf-8'});
      FileSaver.saveAs(blob, `${store.state.canvasName}.aspixel`);

    };

    const handleFullScreen = () => {
      screenfull.toggle();
    }

    return {
      downloadIcon,
      fullscreenIcon,
      isOpenSaveMenu,
      openSaveMenu,
      closeSaveMenu,
      modalPosition,
      saveToImage,
      saveToJson,
      handleFullScreen
    };
  },
};
</script>

<style scoped>

</style>
