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
         class="border border-black rounded-sm p-0.5 bg-gray-300 mr-1 cursor-pointer">
      <img class="w-5 h-5 bg-gray-400 hover:bg-transparent" :src="fullscreenIcon" alt="">
    </div>
    <div title="File" class="border border-black rounded-sm p-0.5 bg-gray-300 cursor-pointer" @click="openFileMenu">
      <img class="w-5 h-5 bg-gray-400 hover:bg-transparent" :src="fileIcon" alt="">
      <ModalContainer :open="isOpenFileMenu" @close="closeFileMenu" >
        <div :style="{top: `${modalPosition.y + 7}px`, left: `calc(${modalPosition.x}px - 15rem)`}"
             class="absolute w-60 border border-black bg-gray-100 p-0.5 cursor-pointer">
          <div class="bg-gray-300 py-0.5">
            <div class="menu-item px-3 h-8 leading-8">
              <label for="localFile" class="file cursor-pointer w-full inline-block">Load from File(.aspixel)</label>
              <input ref="localFile" class="file" id="localFile" @change="loadFromFile" hidden type="file" accept=".aspixel" />
            </div>
            <div class="menu-item px-3 h-8 leading-8" @click="openCreateCanvasDialog">
              Create new Canvas
            </div>
          </div>
        </div>
      </ModalContainer>
    </div>
    <ModalContainer bg="rgba(255,255,255,.6)" :open="isOpenCreateCanvasDialog">
      <CreateCanvas @closeDialog="closeCreateCanvasDialog" />
    </ModalContainer>
  </div>
</template>

<script>
import downloadIcon from '../assets/download.svg';
import fullscreenIcon from '../assets/full-screen.svg';
import fileIcon from '../assets/file.svg';
import canvasToImage from 'canvas-to-image';
import ModalContainer from './ModalContainer.vue';
import CreateCanvas from './CreateCanvas.vue';
import FileSaver from 'file-saver';
import screenfull from 'screenfull';
import {ref} from 'vue';
import {useStore} from 'vuex';

export default {
  name: 'Menu',
  components: {CreateCanvas, ModalContainer},
  setup() {
    const store = useStore();
    const localFile = ref();
    const isOpenSaveMenu = ref(false);
    const isOpenFileMenu = ref(false);
    const isOpenCreateCanvasDialog = ref(false);
    const modalPosition = ref({
      x: 0,
      y: 0,
    });

    function setupModalPosition(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      console.log(e.currentTarget.getBoundingClientRect());
      modalPosition.value = {
        x: rect.right,
        y: rect.bottom,
      };
    }

    const openSaveMenu = (e) => {
      setupModalPosition(e);
      isOpenSaveMenu.value = true;
    };

    const closeSaveMenu = () => {
      isOpenSaveMenu.value = false;
    };

    const openFileMenu = (e) => {
      setupModalPosition(e);
      isOpenFileMenu.value = true;
    };

    const closeFileMenu = (e) => {
      console.log(e);
      if (e && e.target.classList.contains('file')) {
        return;
      }
      isOpenFileMenu.value = false;
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
            toDataURL(),
      };
      console.log(object.data);

      const blob = new Blob([JSON.stringify(object)], {type: 'text/plain;charset=utf-8'});
      FileSaver.saveAs(blob, `${store.state.canvasName}.aspixel`);

    };

    const handleFullScreen = () => {
      screenfull.toggle();
    };

    const loadFromFile = () => {
      const file = localFile.value.files[0];
      console.log(file);
      const fileReader = new FileReader();

      fileReader.onload = e => {
        const data = JSON.parse(e.target.result);
        console.log('data: ',  data);
        store.commit('restoreFromFile', data)
        const canvas = document.getElementById('canvas');
        let context = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          closeFileMenu();
        }
        img.src = data.data;
      }
      fileReader.readAsText(file)
    }

    const openCreateCanvasDialog = () => {
      isOpenCreateCanvasDialog.value = true;
    }

    const closeCreateCanvasDialog = () => {
      isOpenCreateCanvasDialog.value = false;
    }

    const newCanvas = () => {

    }

    return {
      localFile,
      downloadIcon,
      fullscreenIcon,
      fileIcon,
      isOpenSaveMenu,
      isOpenFileMenu,
      isOpenCreateCanvasDialog,
      modalPosition,
      openSaveMenu,
      closeSaveMenu,
      openFileMenu,
      closeFileMenu,
      openCreateCanvasDialog,
      closeCreateCanvasDialog,
      saveToImage,
      saveToJson,
      handleFullScreen,
      loadFromFile,
      newCanvas,
    };
  },
};
</script>

<style scoped>

</style>
