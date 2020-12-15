import {createStore} from 'vuex';

export default createStore({
  state: {
    currentColor: '#ED7440',
  },
  mutations: {
    setColor: (state, color) => {
      state.currentColor = color;
    }
  },
  actions: {},
  modules: {},
});
