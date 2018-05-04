import Intersect from './src/intersect.vue';

function plugin(Vue) {
  Vue.component('intersect', Intersect);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;

// const version = '__VERSION__'

export {
  Intersect,
  // version
};
