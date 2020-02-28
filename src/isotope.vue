<script>
/**
 * vuxtras/isotope
 *
 * Isotope component
 *
 * Usage:
 *
 * <isotope :options="{ layoutMode: 'packery' }" :items="items">
 *
 *  <div v-for="item in items" class="box"></div>
 *
 * </isotope>
 *
 */

let Isotope;
if (typeof window !== 'undefined') {
  Isotope = require('isotope-layout');
  require('isotope-packery');
}

export default {
  props: {
    options: {
      type: Object,
      default() {
        return {
          itemSelector: '.grid-item',
          layoutMode: 'masonry',
        };
      },
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isotope: null,
      rafId: null,
      width: 0,
      height: 0,
      viewportHeight: 0,
    };
  },
  watch: {
    items() {
      this.$nextTick(() => {
        this.isotope.reloadItems();
        this.isotope.arrange();
      });
    },
  },
  mounted() {
    this.init();
  },
  destroyed() {
    this.isotope = null;

    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
    }
  },
  methods: {
    init() {
      this.isotope = new Isotope(this.$el, this.options);

      this.$emit('init', this.isotope);

      if (this.autoResize) {
        this.raf();
      }
    },
    raf() {
      if (
        this.width !== this.$el.clientWidth ||
        this.height !== this.$el.clientHeight ||
        this.viewportHeight !== window.innerHeight
      ) {
        this.width = this.$el.clientWidth;
        this.height = this.$el.clientHeight;
        this.viewportHeight = window.innerHeight;

        this.isotope.arrange();
      }

      this.rafId = window.requestAnimationFrame(this.raf);
    },
  },
};
</script>

<style></style>

<template>
  <div>
    <slot />
  </div>
</template>
