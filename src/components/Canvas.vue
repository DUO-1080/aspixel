<template>
  <div id="container" ref="container" @wheel.prevent="handleZoom"
       class="canvas-display canvas-container border  border-black relative h-full w-full mx-auto" >
    <canvas id="background" ref="backgroundRef"
            class="canvas_display absolute top-0 left-0 w-full h-full z-10"></canvas>
    <canvas id="canvas" ref="canvasRef"
            class="canvas_display absolute top-0 left-0 w-full h-full z-20"></canvas>
    <canvas id="foreground" ref="foregroundRef"
            class="canvas_display absolute top-0 left-0 w-full h-full z-30" @mousemove="handleHover"
            @mousedown="handleDraw"
            @mouseleave="handleMouseLeave"></canvas>
  </div>
</template>

<script>

import {computed, onMounted,onUnmounted, ref, watch} from 'vue';
import {useStore} from 'vuex';
import CanvasBg from '../static/CanvasBg';

export default {
  name: 'Canvas',
  props: {
    cw: Number,
    ch: Number,
  },
  setup(props, context) {
    const store = useStore();
    const backgroundRef = ref();
    const canvasRef = ref();
    const foregroundRef = ref();
    const containerRef = ref();
    const canvasSpec = store.state.canvasSpec;
    let pixelLength = 0;
    let lastX = ref(0);
    let lastY = ref(0);
    let zoom = computed(() => store.state.zoom);

    onMounted(() => {
      console.log('canvas mounted: init now.',backgroundRef.value, canvasRef.value);
      measure();
      setupCanvas();
      drawBg();
      initCanvas();
      window.addEventListener('resize', measure);
      document.title = `ASPIXEL | ${store.state.canvasName}`;
    });

    onUnmounted(() => {
      window.removeEventListener('resize', measure);
    })

    const shouldRefresh = computed(() => store.state.shouldRefresh);

    watch(shouldRefresh, (s) => {
      if (s === true) {
        console.log('canvas should refresh');
        store.commit('refreshedCanvas');
        context.emit('refreshCanvas', store.state.canvasName)
      }
    })

    watch([lastX, lastY], ([x, y], [preX, preY]) => {
      const context = foregroundRef.value.getContext('2d');

      if (!lastX.value === undefined || !lastY.value === undefined) {
        context.clearRect(preX, preY, 1, 1);
        return;

      }
      context.fillStyle = store.state.currentColor;
      context.clearRect(preX, preY, 1, 1);
      context.fillRect(x, y, 1, 1);
    });

    function setupCanvas() {
      backgroundRef.value.width = canvasSpec.w;
      backgroundRef.value.height = canvasSpec.h;
      canvasRef.value.width = canvasSpec.w;
      canvasRef.value.height = canvasSpec.h;
      foregroundRef.value.width = canvasSpec.w;
      foregroundRef.value.height = canvasSpec.h;
    }

    function drawBg() {
      const context = backgroundRef.value.getContext('2d');
      const w = canvasSpec.w;
      const h = canvasSpec.h;
      for (let i = 0; i < w; i += 1) {
        for (let j = 0; j < h; j += 1) {
          if ((i + j) % 2 === 0) {
            context.fillStyle = '#808080';
          } else {
            context.fillStyle = '#c0c0c0';
          }
          context.fillRect(i, j, 1, 1);
        }
      }

    }

    function initCanvas() {
      const canvasBg = store.state.canvasBg;
      const canvasContext = canvasRef.value.getContext('2d');
      if (canvasBg === CanvasBg.WHITE) {
        canvasContext.fillStyle = 'white';
      } else if (canvasBg === CanvasBg.BLACK) {
        canvasContext.fillStyle = 'black';
      } else {
        canvasContext.fillStyle = 'transparent';
      }
      canvasContext.fillRect(0, 0, canvasSpec.w, canvasSpec.h);
    }

    function measure() {
      console.log('measure canvas');
      const w = canvasSpec.w;
      const h = canvasSpec.h;
      const parent = containerRef.value.parentNode;
      const pr = parent.clientWidth / parent.clientHeight;
      const cr = w / h;
      let initW, initH;
      console.log('pr: ', pr, 'cr: ', cr);
      if (pr >= 1 && cr > 1 || pr < 1 && cr >= 1) {
        initW = parent.clientWidth;
        initH = (initW / w) * h;
      } else if (pr <= 1 && cr < 1 || pr > 1 && cr <= 1) {
        initH = parent.clientHeight;
        initW = (initH / h) * w;
      }

      pixelLength = initW / w;
      console.log('measure pixelLength: ' ,pixelLength);

      containerRef.value.style.width = initW + 'px';
      containerRef.value.style.height = initH + 'px';
    }

    function handleHover(e) {
      if (e.buttons === 1) {
        handleDraw();
      }
      let x = e.clientX;
      let y = e.clientY;
      const rect = canvasRef.value.getBoundingClientRect();
      x -= rect.left;
      y -= rect.top;
      lastX.value = Math.floor(x / (pixelLength * (zoom.value)));
      lastY.value = Math.floor(y / (pixelLength * (zoom.value)));
      console.log('hover pixelLength: ', pixelLength);
      store.commit('setPoint', {x: lastX.value, y: lastY.value});
    }

    function handleMouseLeave() {
      lastX.value = undefined;
      lastY.value = undefined;
      store.commit('setPoint', {x: undefined, y: undefined});
    }

    function handleDraw() {
      const context = canvasRef.value.getContext('2d');
      context.fillStyle = store.state.currentColor;
      context.fillRect(lastX.value, lastY.value, 1, 1);
    }

    function handleZoom(e) {
      const container = containerRef.value;
      const direction = e.deltaY < 0 ? 1 : -1;

      let z = zoom.value + direction;
      if (z < 1) {
        z = 1;
      }

      store.commit('setZoom', z);
      console.log('zoom',z, pixelLength, canvasSpec);
      container.style.height = `${pixelLength * canvasSpec.h * z}px`;
      container.style.width = `${pixelLength * canvasSpec.w * z}px`;

      const x = direction * lastX.value * pixelLength + container.parentElement.scrollLeft;
      const y = direction * lastY.value * pixelLength + container.parentElement.scrollTop;
      context.emit('handleZoom', x, y);

      return false;
    }

    function handleMove(e) {
      if (e.buttons === 1) {
        console.log('move');
      }

    }

    return {
      backgroundRef,
      canvasRef,
      foregroundRef,
      container: containerRef,
      handleHover,
      handleMouseLeave,
      handleDraw,
      handleZoom,
      handleMove,
    };
  },
};
</script>

<style scoped>
.canvas_display {
  -ms-interpolation-mode: -webkit-optimize-contrast;
  image-rendering: nearest-neighbor;
  image-rendering: optimizeSpeed;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: optimize-contrast;
  image-rendering: -o-pixelated;
  -ms-interpolation-mode: nearest-neighbor;
  image-rendering: pixelated;
  -ms-touch-action: none;
  touch-action: none;
}
</style>
