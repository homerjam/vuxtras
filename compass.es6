import Compass from './src/compass.es6';

function plugin(Vue) {
  Vue.component('compass', Compass);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;

// const version = '__VERSION__'

export {
  Compass,
  // version
};
