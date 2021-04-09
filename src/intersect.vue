<script>
/**
 * vuxtras/intersect
 *
 * Intersection component
 *
 * Usage:
 *
 * <intersect :threshold="[0.5, 0]" root-margin="100px 0px 100px 0px" @change="showImage($event.isIntersecting)">
 *
 *  <img src="image.jpg">
 *
 * </isotope>
 *
 */

import Vue from 'vue';

if (typeof window !== 'undefined') {
  require('intersection-observer');
}

const warn = (msg) => {
  if (!Vue.config.silent) {
    console.warn(msg);
  }
};

const isEqualArrays = (a, b) => {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

export default {
  name: 'Intersect',
  abstract: true,
  props: {
    root: {
      type: typeof HTMLElement !== 'undefined' ? HTMLElement : Object,
      default: () => null,
    },
    threshold: {
      type: Array,
      default: () => [0],
    },
    rootMargin: {
      type: String,
      default: '0px',
    },
  },
  watch: {
    threshold(newValue, oldValue) {
      if (!isEqualArrays(newValue, oldValue)) {
        this.init();
      }
    },
    rootMargin() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.reset();
  },
  methods: {
    init() {
      this.reset();

      this.entry = null;
      this.isIntersecting = null;

      this.observer = new IntersectionObserver(
        (entries) => {
          this.entry = entries[0];

          if (this.entry.isIntersecting !== this.isIntersecting) {
            this.isIntersecting = this.entry.isIntersecting;

            if (this.isIntersecting) {
              this.$emit('enter', this.entry);
            } else {
              this.$emit('leave', this.entry);
            }

            this.$emit('change', this.entry);
          }

          this.$emit('update', this.entry);
        },
        {
          threshold: this.threshold,
          root: this.root,
          rootMargin: this.rootMargin,
        }
      );

      this.$nextTick(() => {
        if (this.$slots.default && this.$slots.default.length > 1) {
          warn(
            '[vuxtras/intersect] You may only wrap one element in a <intersect> component.'
          );
        } else if (!this.$slots.default || this.$slots.default.length < 1) {
          warn(
            '[vuxtras/intersect] You must have one child inside a <intersect> component.'
          );
          return;
        }

        this.observer.observe(this.$slots.default[0].elm);
      });
    },
    reset() {
      if (this.observer) {
        this.observer.disconnect();
      }
    },
  },
  render() {
    return this.$slots.default ? this.$slots.default[0] : null;
  },
};
</script>
