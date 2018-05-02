<script>
let Isotope;
if (process.browser) {
  // eslint-disable-next-line
  Isotope = require('isotope-layout');
  // eslint-disable-next-line
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
      required: true,
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
  watch: {
    items() {
      this.$nextTick(() => {
        this.isotope.reloadItems();
        this.isotope.arrange();
      });
    },
  },
};
</script>

<style>
</style>

<template>
<div>
  <slot></slot>
</div>
</template>
