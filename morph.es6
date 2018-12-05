import Morph from './src/morph.es6';

function plugin(Vue) {
  Vue.directive('morph', Morph);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;

// const version = '__VERSION__'

export {
  Morph,
  // version
};
