import Flickity from './src/flickity.vue';

function plugin(Vue) {
  Vue.component('flickity', Flickity);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;

// const version = '__VERSION__'

export {
  Flickity,
  // version
};
