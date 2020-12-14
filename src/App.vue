<template>
  <div class="flex w-screen h-screen">
    <div class="w-80">
      <ColorPicker />
    </div>
    <div ref="right" class="flex-grow w-3/4 h-full border-blue-300 border overflow-auto" @wheel.prevent>
      <Canvas @handleZoom="handleZoom" :ch="32" :cw="32"/>
    </div>
  </div>
</template>

<script>
import Canvas from './components/Canvas.vue';
import {ref} from 'vue';
import ColorPicker from './components/ColorPicker.vue';

export default {
  name: 'App',
  components: {
    ColorPicker,
    Canvas,
  },
  setup() {
    const right = ref();

    function handleZoom(x, y) {
      right.value.scrollLeft = x;
      right.value.scrollTop = y;
    }

    return {
      handleZoom,
      right,
    };
  },

};
</script>
