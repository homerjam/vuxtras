<template>
  <div
    v-show="isVisible"
    :style="{
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
    }"
  >
    <slot />
  </div>
</template>

<script>
/**
 * vuxtras/follow
 *
 * Follow component
 *
 * Usage:
 *
 *
 * <follow :isVisible="true">
 *
 *  <!-- content here -->
 *
 * </follow>
 *
 */

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isVisible: this.visible,
      x: 0,
      y: 0,
      raf: null,
    };
  },
  mounted() {
    document.addEventListener('mousemove', this.mousemove);

    this.$el.parentNode.addEventListener('mouseenter', this.show);
    this.$el.parentNode.addEventListener('mouseleave', this.hide);
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.mousemove);

    this.$el.parentNode.removeEventListener('mouseenter', this.show);
    this.$el.parentNode.removeEventListener('mouseleave', this.hide);
  },
  methods: {
    mousemove(event) {
      this.x = event.pageX;
      this.y = event.pageY;
    },
    animate() {
      this.$el.style.transform = `translate(${this.x}px, ${this.y}px)`;

      this.raf = window.requestAnimationFrame(this.animate);
    },
    show() {
      this.isVisible = true;

      this.raf = window.requestAnimationFrame(this.animate);
    },
    hide() {
      this.isVisible = false;

      window.cancelAnimationFrame(this.raf);
    },
  },
};
</script>
