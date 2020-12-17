<template>
  <div class="w-80 bg-white p-0.5 border border-black rounded-sm">
    <div class="bg-gray-400 rounded-sm">
      <h2 class="font-medium text-2xl text-center py-3" style="background-color: #7c919d">New Canvas</h2>
      <div class="px-3">
        <div class="my-2">
          <p class="text-lg"><label for="canvas-name">Name</label></p>
          <input v-model="name" id="canvas-name" class="px-3 py-1 rounded w-full " type="text"
                 placeholder="Enter Canvas Name">
        </div>
        <div class="border-t border-gray-500 my-4">
          <p class="mt-2 text-lg">Canvas Size</p>
          <form>
            <div class="my-1 flex items-center"><label class="inline-block w-14" for="canvas-width">Width</label>
              <input v-model.number="width" class="flex-grow px-3 py-1 rounded" id="canvas-width" type="number" max="200"
                     min="4"></div>
            <div class="my-1 flex items-center"><label class="inline-block w-14" for="canvas-height">Height</label>
              <input v-model.number="height" class="flex-grow px-3 py-1 rounded" id="canvas-height" type="number" max="200"
                     min="4"></div>
          </form>
        </div>
        <div class="border-t border-gray-500 py-2">
          <p class="mb-1 text-lg">Canvas Background</p>
          <div class="flex ">
            <div @click="handleSelectBg(CanvasBg.TRANSPARENT)"
                 class="flex bg-item justify-center p-0.5 flex-col border border-black flex-grow bg-gray-100 mr-1 rounded-sm">
              <div class=" bg-gray-400 cursor-pointer items-center justify-center flex flex-col rounded-sm"
                   :style="{backgroundColor: selectedBg === CanvasBg.TRANSPARENT ? 'lightgray': ''}">
                <p>Transparent</p>
                <img class="inline-block my-1 mb-2 w-6 h-6" :src="bgTransparent" alt="">
              </div>
            </div>
            <div @click="handleSelectBg(CanvasBg.WHITE)"
                 class="flex bg-item justify-center p-0.5 flex-col border border-black w-20 bg-gray-100 mr-1 rounded-sm">
              <div class=" bg-gray-400 cursor-pointer items-center justify-center flex flex-col rounded-sm"
                   :style="{backgroundColor: selectedBg === CanvasBg.WHITE ? 'lightgray': ''}">
                <p>White</p>
                <img class="inline-block my-1 mb-2  w-6 h-6" :src="bgWhite" alt="">
              </div>
            </div>
            <div @click="handleSelectBg(CanvasBg.BLACK)"
                 class="flex bg-item justify-center p-0.5 flex-col border border-black w-20 bg-gray-100 rounded-sm">
              <div class=" bg-gray-400 cursor-pointer items-center justify-center flex flex-col rounded-sm"
                   :style="{backgroundColor: selectedBg === CanvasBg.BLACK ? 'lightgray': ''}">
                <p>Black</p>
                <img class="inline-block my-1 mb-2  w-6 h-6" :src="bgBlack" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-500 py-2 flex justify-between">
          <button @click="handleCancel" class="border border-black px-2 py-1 rounded bg-gray-200">Cancel</button>
          <button @click="createNewCanvas" class="border border-black px-2 py-1 rounded bg-gray-200 text-white text-lg font-medium"
                  style="background-color: #77919d">Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CanvasBg from '../static/CanvasBg';
import bgTransparent from '../assets/bg-transparent.svg';
import bgWhite from '../assets/bg-white.svg';
import bgBlack from '../assets/bg-black.svg';
import {ref, watch} from 'vue';
import {useStore} from 'vuex';

export default {
  name: 'CreateCanvas',
  setup(props, context) {
    const store = useStore();
    const selectedBg = ref(CanvasBg.TRANSPARENT);
    const width = ref(32);
    const height = ref(32);
    const name = ref('aspixel');

    const handleSelectBg = (bg) => {
      selectedBg.value = bg;
    };

    const handleCancel = () => {
      context.emit('closeDialog');
    };

    watch([width, height], () => {
      console.log(typeof width.value);
      if (width.value > 200) {
        width.value = 200;
      }
      if (height.value > 200) {
        height.value = 200;
      }
    });

    const createNewCanvas = () => {
      store.commit('init', {
        canvasSpec: {
          w: width.value,
          h: height.value,
        },
        canvasBg: selectedBg.value,
        name: name,
      });

      handleCancel();
    };

    return {
      bgTransparent,
      bgWhite,
      bgBlack,
      CanvasBg,
      selectedBg,
      handleSelectBg,
      handleCancel,
      createNewCanvas,
      width,
      height,
      name,
    };
  },

};

</script>

<style scoped>
.bg-item:hover {
  background-color: lightgray;
}

.selectedbg {
  background-color: white;
}
</style>
