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
  afterDestroy() {
    this.isotope = null;
  },
  methods: {
    init() {
      this.isotope = new Isotope(this.$el, this.options);
      this.$emit('init', this.isotope);
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
