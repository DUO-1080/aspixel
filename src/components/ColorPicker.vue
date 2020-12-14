<template>
  <div id="colorContainer" class="relative w-full">
    <div class="color-picker">
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex';
import {onMounted, ref, watch} from 'vue';
import Pickr from '@simonwep/pickr';
import '@simonwep/pickr/dist/themes/nano.min.css';

export default {
  name: 'ColorPicker',
  setup() {
    const store = useStore();
    const color = ref(store.state.currentColor);

    onMounted(() => {
      const pickr = Pickr.create({
        el: '.color-picker',
        container: '#colorContainer',
        theme: 'nano', // or 'monolith', or 'nano'

        useAsButton: true,
        default: null,
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
        console.log('Event: "save"', color, instance);

      }).on('changestop', (source, instance) => {
        console.log('Event: "changestop"', instance._color.toHEXA().toString());
        store.commit('setColor', instance._color.toHEXA().toString());
      });
    });

    watch(color, () => {
      console.log('set color: ', color);
      store.commit('setColor', color);
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
