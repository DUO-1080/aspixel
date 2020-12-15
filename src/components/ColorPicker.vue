<template>
  <div id="colorContainer" class="relative w-full border border-black rounded-sm" >
    <div class="color-picker">
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex';
import {computed, onMounted, ref, watch} from 'vue';
import Pickr from '@simonwep/pickr';
import '@simonwep/pickr/dist/themes/nano.min.css';

export default {
  name: 'ColorPicker',
  setup() {
    const store = useStore();
    const color = computed(() => store.state.currentColor);
    let pickr;

    onMounted(() => {
      pickr = Pickr.create({
        el: '.color-picker',
        container: '#colorContainer',
        theme: 'nano', // or 'monolith', or 'nano'

        useAsButton: true,
        default: store.state.currentColor,
        swatches: null,
        showAlways: true,

        components: {
          palette: true,
          // Main components
          preview: true,
          opacity: true,
          hue: true,

          // Input / output Options
          interaction: {
            hex: true,
            rgba: true,
            hsla: true,
            // hsva: true,
            // cmyk: true,
            input: true,
            // clear: true,
            save: true,
          },
        },
      });


      pickr.on('save', (color, instance) => {
        console.log('Event: "save"', color.toHEXA().toString().toLowerCase(), instance);
        store.commit('setPalette', color.toHEXA().toString().toLowerCase())
      }).on('changestop', (source, instance) => {
        console.log('Event: "changestop"', instance._color.toHEXA().toString().toLowerCase());
        store.commit('setColor', instance._color.toHEXA().toString().toLowerCase());
      });
    });

    watch(color, (color) => {
      pickr.setColor(color, true)
    });

    return {
      color,
    };
  },
};
</script>

<style>
.pcr-app {
  width: 100% !important;
  position: static !important;
}

</style>
