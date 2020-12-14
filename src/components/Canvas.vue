<template>
  <div id="container" ref="container" @wheel.prevent="handleZoom"
       class="canvas-display canvas-container relative bg-blue-50 h-full flex justify-center items-center  mx-auto transition-transform">
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

import {onMounted, ref, watch, computed} from 'vue';
import {useStore} from 'vuex';

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
    let pixelLength = 0;
    let lastX = ref(0);
    let lastY = ref(0);
    let zoom = 1;
    onMounted(() => {
      console.log(backgroundRef.value, canvasRef.value);
      measure(props.cw, props.ch);
      setupCanvas();
      drawBg();
    });

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
      backgroundRef.value.width = props.cw;
      backgroundRef.value.height = props.ch;
      canvasRef.value.width = props.cw;
      canvasRef.value.height = props.ch;
      foregroundRef.value.width = props.cw;
      foregroundRef.value.height = props.ch;
    }

    function drawBg() {
      const context = backgroundRef.value.getContext('2d');
      const w = props.cw;
      const h = props.ch;
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

    function measure(cw, ch) {
      const parent = containerRef.value.parentNode;
      const pr = parent.clientWidth / parent.clientHeight;
      const cr = cw / ch;
      let initW, initH;
      console.log('pr: ', pr, 'cr: ', cr);
      if (pr > 1 && cr > 1 || pr <= 1 && cr > 1) {
        initW = parent.clientWidth;
        initH = (initW / cw) * ch;
      } else if (pr <= 1 && cr <= 1 || pr > 1 && cr <= 1) {
        initH = parent.clientHeight;
        initW = (initH / ch) * cw;
      }

      pixelLength = initW / cw;

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
      lastX.value = Math.floor(x / (pixelLength * (zoom)));
      lastY.value = Math.floor(y / (pixelLength * (zoom)));
      console.log('hover: ', x, y, store.state.currentColor);
    }

    function handleMouseLeave() {
      lastX.value = undefined;
      lastY.value = undefined;
    }

    function handleDraw() {
      console.log('canvas click', lastX.value, lastY.value);
      const context = canvasRef.value.getContext('2d');
      context.fillStyle = store.state.currentColor;
      context.fillRect(lastX.value, lastY.value, 1, 1);
    }

    function handleZoom(e) {
      const container = containerRef.value;
      const direction = e.deltaY < 0 ? 1 : -1;
      zoom += direction;
      if (zoom < 1) {
        zoom = 1;
      }
      container.style.height = `${pixelLength * props.ch * zoom}px`;
      container.style.width = `${pixelLength * props.cw * zoom}px`;

      const x = direction * lastX.value * pixelLength + container.parentElement.scrollLeft;
      const y = direction * lastY.value * pixelLength + container.parentElement.scrollTop;
      context.emit('handleZoom', x, y)

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
      handleMove
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
