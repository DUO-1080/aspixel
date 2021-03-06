import {createStore} from 'vuex';
import palettes from '../assets/PresetPalettes';
import PaletteSize from '../static/PaletteSize';
import CanvasBg from '../static/CanvasBg';

export default createStore({
  state: {
    currentColor: '#ED7440',
    currentPalette: palettes[0],
    canvasName: 'aspixel-1',
    canvasBg: CanvasBg.TRANSPARENT,
    canvasData: null,
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
    shouldRefresh: false,
  },
  mutations: {
    setColor: (state, color) => {
      state.currentColor = color;
    },
    addColorToPalette: (state, color) => {
      if (!state.currentPalette.colors.some(
          item => item === color)) {
        // state.currentPalette = [...state.currentPalette, color];
        state.currentPalette.colors = [...state.currentPalette.colors, color];
      }
    },

    // useless, should setup in init
    initPalette: (state, palette) => {
      state.currentPalette = palette;
    },

    // setup canvas init property
    init: (state, init) => {
      state.canvasSpec = init.canvasSpec;
      state.canvasName = init.name;
      state.canvasBg = init.canvasBg;
      state.shouldRefresh = true;
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

    restoreFromFile: (state, object) => {
      state.currentColor = object.currentColor;
      state.currentPalette = object.currentPalette;
      state.canvasSpec = object.canvasSpec;
      state.paletteSize = object.paletteSize;
      state.canvasBg = object.canvasBg;
      state.canvasName = object.canvasName;
      state.canvasData = object.data;
      state.shouldRefresh = true;
    },

    refreshedCanvas: state => {
      state.shouldRefresh = false;
    }
  },
  actions: {},
  modules: {},
});
