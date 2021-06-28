import Avoid from '../src/avoid.vue';

function plugin(Vue) {
  Vue.component('Avoid', Avoid);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;

// const version = '__VERSION__'

export {
  Avoid,
  // version
};
