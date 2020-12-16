import {createStore} from 'vuex';
import palettes from '../assets/PresetPalettes';
import PaletteSize from '../static/PaletteSize';

export default createStore({
  state: {
    currentColor: '#ED7440',
    currentPalette: palettes[0],
    canvasName: 'aspixel-1',
    zoom: 1,
    point: {
      x: undefined,
      y: undefined,
    },
    canvasSpec: {
      w: 32,
      h: 32,
    },
    hoverPalette: {
      color: undefined,
      index: undefined,
    },
    // small, medium, large
    paletteSize: PaletteSize.medium,
  },
  mutations: {
    setColor: (state, color) => {
      state.currentColor = color;
    },
    addColorToPalette: (state, color) => {
      if (!state.currentPalette.some(
          item => item === color)) {
        state.currentPalette = [...state.currentPalette, color];
      }
    },

    // useless, should setup in init
    initPalette: (state, palette) => {
      state.currentPalette = palette;
    },

    // setup canvas init property
    init: (state, init) => {
      state.canvasSpec = init.canvasSpec;
      state.currentPalette = init.palette;
      state.canvasName = init.name;
    },

    setPalette: (state, palette) => {
      state.currentPalette = palette;
    },

    setZoom: (state, zoom) => {
      state.zoom = zoom;
    },

    setPoint: (state, point) => {
      state.point = point;
    },

    // useless, should setup in init
    setCanvasSpec: (state, canvasSpec) => {
      state.canvasSpec = canvasSpec;
    },

    setHoverPalette: (state, hover) => {
      state.hoverPalette = hover;
    },

    setPaletteSize: (state, size) => {
      state.paletteSize = size;
    },

  },
  actions: {},
  modules: {},
});
