import Compass from '../src/compass';

function plugin(Vue) {
  Vue.component('Compass', Compass);
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
