import Touch from '../src/touch';

function plugin(Vue) {
  Vue.directive('touch', Touch);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;

// const version = '__VERSION__'

export {
  Touch,
  // version
};
