import SmartLink from '../src/smart-link.vue';

function plugin(Vue) {
  Vue.component('smart-link', SmartLink);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;

// const version = '__VERSION__'

export {
  SmartLink,
  // version
};
