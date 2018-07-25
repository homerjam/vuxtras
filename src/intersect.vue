<script>
/**
 * vextras/intersect
 *
 * Intersection component
 *
 * Usage:
 *
 * <intersect :threshold="[0]" root-margin="100px 0px 100px 0px" @enter="showImage()">
 *
 *  <img src="image.jpg">
 *
 * </isotope>
 *
 */

import Vue from 'vue';

if (process.client) {
  // eslint-disable-next-line
  require('intersection-observer');
}

const warn = (msg) => {
  if (!Vue.config.silent) {
    // eslint-disable-next-line
    console.warn(msg);
  }
};

export default {
  name: 'intersect',
  abstract: true,
  props: {
    threshold: {
      type: Array,
      required: false,
      default: () => [0, 0],
    },
    root: {
      type: typeof HTMLElement !== 'undefined' ? HTMLElement : Object,
      required: false,
      default: () => null,
    },
    rootMargin: {
      type: String,
      required: false,
      default: () => '0px 0px 0px 0px',
    },
  },
  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        this.$emit('leave', entries[0]);
      } else {
        this.$emit('enter', entries[0]);
      }

      this.$emit('change', entries[0]);
    }, {
      threshold: this.threshold,
      root: this.root,
      rootMargin: this.rootMargin,
    });

    this.$nextTick(() => {
      if (this.$slots.default && this.$slots.default.length > 1) {
        warn('[vextras/intersect] You may only wrap one element in a <intersect> component.');
      } else if (!this.$slots.default || this.$slots.default.length < 1) {
        warn('[vextras/intersect] You must have one child inside a <intersect> component.');
        return;
      }

      this.observer.observe(this.$slots.default[0].elm);
    });
  },
  destroyed() {
    this.observer.disconnect();
  },
  render() {
    return this.$slots.default ? this.$slots.default[0] : null;
  },
};
</script>
