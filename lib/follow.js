import Follow from '../src/follow.vue';

function plugin(Vue) {
  Vue.component('Follow', Follow);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;

// const version = '__VERSION__'

export {
  Follow,
  // version
};
