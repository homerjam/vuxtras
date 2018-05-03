/**
 * vextras/touch
 *
 * Hammer.js directive
 *
 * Usage:
 *
 * <div v-touch:tap="tapMethod"></div>
 *
 * <div v-touch:swiperight="onSwipeRight()"></div>
 */

let Hammer;
if (typeof window !== 'undefined') {
  // eslint-disable-next-line
  Hammer = require('hammerjs');
  delete Hammer.defaults.cssProps.userSelect;
}

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default {
  bind(el, binding) {
    if (!el.$hammer) {
      el.$hammer = new Hammer.Manager(el);
    }

    const gesture = capitalize(binding.arg);
    const direction = Object.keys(binding.modifiers).length ? Object.keys(binding.modifiers)[0].toUpperCase() : 'ALL';

    const options = {
      direction: Hammer[`DIRECTION_${direction}`],
    };

    try {
      el.$hammer.add(new Hammer[gesture](options));
    } catch (error) {
      throw new Error('[vue-touch] invalid gesture');
    }

    if (typeof binding.value !== 'function') {
      throw new Error('[vue-touch] invalid handler');
    }

    el.$hammer.on(gesture.toLowerCase(), binding.value);
  },
  unbind(el) {
    el.$hammer.destroy();
    el.$hammer = null;
  },
};
