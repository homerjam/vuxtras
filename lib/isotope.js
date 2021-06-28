import Isotope from '../src/isotope.vue';

function plugin(Vue) {
  Vue.component('Isotope', Isotope);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;

// const version = '__VERSION__'

export {
  Isotope,
  // version
};
