import ResponsiveBackgroundImage from './src/responsive-background-image.vue';

function plugin(Vue) {
  Vue.component('rb-img', ResponsiveBackgroundImage);
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin;

// const version = '__VERSION__'

export {
  ResponsiveBackgroundImage,
  // version
};
