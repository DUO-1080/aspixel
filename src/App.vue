<template>
  <div class="flex flex-col w-screen h-screen" style="background-color: #7d929e">
    <div class="w-full flex items-center h-10">
      <PaletteTool/>
      <Menu/>
    </div>
    <div class="main flex flex-grow h-full">
      <div class="w-80 flex flex-col mx-3">
        <Palette/>
        <ColorPicker/>
      </div>
      <div class="canvas overflow-auto h-full border p-0.5 bg-white border-black rounded-sm"
           @wheel.prevent>
        <div ref="right" class="h-full overflow-auto border border-black rounded-sm" style="background-color: #655561">
          <Canvas :key="canvasKey" @refreshCanvas="refreshCanvas" @handleZoom="handleZoom"/>
        </div>
      </div>
    </div>
    <div class="w-full h-8">
      <StatusBar/>
    </div>

  </div>
</template>

<script>
import Canvas from './components/Canvas.vue';
import {computed, ref} from 'vue';
import ColorPicker from './components/ColorPicker.vue';
import Palette from './components/Palette.vue';
import StatusBar from './components/StatusBar.vue';
import PaletteTool from './components/PaletteTool.vue';
import Menu from './components/Menu.vue';
import {useStore} from 'vuex';

export default {
  name: 'App',
  components: {
    Menu,
    PaletteTool,
    StatusBar,
    Palette,
    ColorPicker,
    Canvas,
  },
  setup() {

    const right = ref();
    const canvasKey = ref('aspixel');

    function handleZoom(x, y) {
      right.value.scrollLeft = x;
      right.value.scrollTop = y;
    }

    function refreshCanvas(name) {
      canvasKey.value = `${name}-${new Date().getMilliseconds()}`;
    }

    return {
      handleZoom,
      refreshCanvas,
      right,
      canvasKey,
    };
  },

};
</script>

<style scoped>
.main {
  height: calc(100% - 4.5rem);
}

.canvas {
  width: calc(100% - 20rem);
  height: 100%;
}
</style>
