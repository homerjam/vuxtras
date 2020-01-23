import Wheel from '../src/wheel';

function plugin(Vue) {
  Vue.directive('wheel', Wheel);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;

// const version = '__VERSION__'

export {
  Wheel,
  // version
};
