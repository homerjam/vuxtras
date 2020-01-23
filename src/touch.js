/**
 * vuxtras/touch
 *
 * Hammer.js directive
 *
 * Usage:
 *
 * <div v-touch:tap="tapMethod"></div>
 *
 * <div v-touch:swipe.right="onSwipeRight()"></div>
 */

let Hammer;
if (typeof window !== 'undefined') {
  Hammer = require('hammerjs');
  delete Hammer.defaults.cssProps.userSelect;
}

const capitalize = str =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default {
  bind(el, binding) {
    if (!el.$hammer) {
      el.$hammer = new Hammer.Manager(el);
    }

    const gesture = capitalize(binding.arg);
    const direction = Object.keys(binding.modifiers).length
      ? Object.keys(binding.modifiers)[0].toUpperCase()
      : 'ALL';

    const options = {
      direction: Hammer[`DIRECTION_${direction}`],
    };

    try {
      el.$hammer.add(new Hammer[gesture](options));
    } catch (error) {
      throw new Error('[vuxtras/touch] invalid gesture');
    }

    if (typeof binding.value !== 'function') {
      throw new Error('[vuxtras/touch] invalid handler');
    }

    el.$hammer.on(gesture.toLowerCase(), binding.value);
  },
  unbind(el) {
    if (el.$hammer) {
      el.$hammer.destroy();
      el.$hammer = null;
    }
  },
};
