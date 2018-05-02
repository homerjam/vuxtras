<script>
let Flickity;
if (process.browser) {
  // eslint-disable-next-line
  Flickity = require('flickity');
}

export default {
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    init() {
      this.flickity = new Flickity(this.$el, this.options);

      this.$emit('init', this.flickity);

      if (this.options.autoResize) {
        this.raf();
      }
    },
    raf() {
      if (this.width !== this.$el.clientWidth || this.height !== this.$el.clientHeight) {
        this.width = this.$el.clientWidth;
        this.height = this.$el.clientHeight;

        this.flickity.resize();
      }

      this.rafId = window.requestAnimationFrame(this.raf);
    },
  },
  mounted() {
    if (this.options.initDelay && this.options.initDelay > -1) {
      setTimeout(() => {
        this.init();
      }, this.options.initDelay);
    } else {
      this.init();
    }
  },
  afterDestroy() {
    this.flickity = null;

    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
    }
  },
};
</script>

<style>
@import '~flickity/dist/flickity.css';
</style>

<template>
<div>
  <slot></slot>
</div>
</template>
