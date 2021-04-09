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
  data() {
    return {
      isIntersecting: false,
    };
  },
  watch: {
    threshold() {
      this.init();
    },
    rootMargin() {
      this.init();
    },
    isIntersecting() {
      if (this.isIntersecting) {
        this.$emit('enter', this.entry);
      } else {
        this.$emit('leave', this.entry);
      }

      this.$emit('change', this.entry);
    },
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.observer.disconnect();
  },
  methods: {
    init() {
      if (this.observer) {
        this.observer.disconnect();
      }

      this.entry = null;

      this.observer = new IntersectionObserver(
        (entries) => {
          this.entry = entries[0];

          this.isIntersecting = this.entry.isIntersecting;

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
  },
  render() {
    return this.$slots.default ? this.$slots.default[0] : null;
  },
};
</script>
