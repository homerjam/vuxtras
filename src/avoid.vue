<script>
/**
 * vextras/avoid
 *
 * Translate element in opposition of mouse movement
 *
 * Usage:
 *
 * <avoid multiplier="2">
 *
 *  <img src="image.jpg">
 *
 * </avoid>
 *
 */

export default {
  name: 'avoid',
  abstract: true,
  props: {
    multiplier: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    mousemove(event) {
      const x = (event.layerX / this.$el.clientWidth) * this.multiplier;
      const y = (event.layerY / this.$el.clientHeight) * this.multiplier;

      this.$el.style.transform = `translate(-${x}%, -${y}%)`;
    },
  },
  mounted() {
    this.$el.parentNode.addEventListener('mousemove', this.mousemove);
  },
  destroyed() {
    this.$el.parentNode.removeEventListener('mousemove', this.mousemove);
  },
  render() {
    return this.$slots.default ? this.$slots.default[0] : null;
  },
};
</script>
