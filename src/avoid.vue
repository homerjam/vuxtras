<script>
/**
 * vuxtras/avoid
 *
 * Translate element in opposition of mouse movement
 *
 * Usage:
 *
 * <avoid multiplier="2">
 *
 *  <img src="image.jpg" />
 *
 * </avoid>
 *
 */

export default {
  name: 'Avoid',
  abstract: true,
  props: {
    multiplier: {
      type: Number,
      default: 1,
    },
    parentSelector: {
      type: String,
      default: '',
    },
    targetSelector: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      parent: null,
      target: null,
    };
  },
  mounted() {
    this.parent = this.parentSelector
      ? this.$el.querySelector(this.parentSelector)
      : this.$el.parentNode;
    this.target = this.targetSelector
      ? this.$el.querySelector(this.targetSelector)
      : this.$el;

    this.parent.addEventListener('mousemove', this.mousemove, false);
  },
  destroyed() {
    if (this.parent) {
      this.parent.removeEventListener('mousemove', this.mousemove);
    }
  },
  methods: {
    mousemove(event) {
      const rect = this.parent.getBoundingClientRect();
      const x =
        ((event.clientX - rect.x) / this.parent.clientWidth - 0.5) *
        -2 *
        this.multiplier;
      const y =
        ((event.clientY - rect.y) / this.parent.clientHeight - 0.5) *
        -2 *
        this.multiplier;

      this.target.style.transform = `translate(${x}%, ${y}%)`;
    },
  },
  render() {
    return this.$slots.default ? this.$slots.default[0] : null;
  },
};
</script>
