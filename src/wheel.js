/**
 * vuxtras/wheel
 *
 * Hamster.js directive
 *
 * Usage:
 *
 * <div v-wheel="wheelMethod"></div>
 *
 */

let Hamster;
if (typeof window !== 'undefined') {
  Hamster = require('hamsterjs');
}

export default {
  bind(el, binding) {
    if (!el.$hamster) {
      el.$hamster = new Hamster(el);
    }

    if (typeof binding.value !== 'function') {
      throw new TypeError('[vuxtras/wheel] invalid handler');
    }

    el.$hamster.wheel(binding.value);
  },
  unbind(el) {
    if (el.$hamster) {
      el.$hamster.unwheel();
      el.$hamster = null;
    }
  },
};
