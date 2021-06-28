import SmartLink from '../src/smart-link.vue';

function plugin(Vue) {
  Vue.component('SmartLink', SmartLink);
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
