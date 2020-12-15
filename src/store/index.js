import {createStore} from 'vuex';
import palettes from '../assets/PresetPalettes';

export default createStore({
  state: {
    currentColor: '#ED7440',
    currentPalette: palettes[0].colors,
  },
  mutations: {
    setColor: (state, color) => {
      state.currentColor = color;
    },
    setPalette: (state, color) => {
      if (!state.currentPalette.some(
          item => item === color)) {
        state.currentPalette = [...state.currentPalette, color];
      }
    },
    initPalette: (state, palette) => {
      state.currentPalette = palette;
    },
  },
  actions: {},
  modules: {},
});
