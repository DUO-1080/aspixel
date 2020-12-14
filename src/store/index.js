import {createStore} from 'vuex';

export default createStore({
  state: {
    currentColor: '#ED7440',
  },
  mutations: {
    setColor: (state, color) => {
      console.log('state change: ', color);
      state.currentColor = color;
    }
  },
  actions: {},
  modules: {},
});
