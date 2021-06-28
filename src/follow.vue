<script>
/**
 * vuxtras/follow
 *
 * Follow component
 *
 * Usage:
 *
 *
 * <follow :visible="true">
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
      left: 0,
      top: 0,
      x: 0,
      y: 0,
      raf: null,
    };
  },
  mounted() {
    this.$el.style.position = 'absolute';
    this.$el.style.top = '0';
    this.$el.style.left = '0';
    this.$el.style.pointerEvents = 'none';
    this.$el.style.opacity = this.isVisible ? 1 : 0;

    document.addEventListener('mousemove', this.mousemove);

    if (this.$el.parentNode) {
      // this.$el.parentNode.style.overflow = 'hidden';

      this.$el.parentNode.addEventListener('mouseenter', this.show);
      this.$el.parentNode.addEventListener('mouseleave', this.hide);
    }
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.mousemove);

    if (this.$el.parentNode) {
      this.$el.parentNode.removeEventListener('mouseenter', this.show);
      this.$el.parentNode.removeEventListener('mouseleave', this.hide);
    }
  },
  methods: {
    mousemove(event) {
      // this.x = event.pageX;
      // this.y = event.pageY;

      const rect = this.$el.parentElement.getBoundingClientRect();

      this.left = rect.left;
      this.top = rect.top;

      this.x = event.x;
      this.y = event.y;
    },
    animate() {
      // this.$el.style.transform = `translate(${this.x}px, ${this.y}px)`;

      this.$el.style.transform = `translate(${this.x - this.left}px, ${
        this.y - this.top
      }px)`;

      this.raf = window.requestAnimationFrame(this.animate);
    },
    show() {
      this.isVisible = true;
      this.$el.style.opacity = this.isVisible ? 1 : 0;

      this.raf = window.requestAnimationFrame(this.animate);
    },
    hide() {
      this.isVisible = false;
      this.$el.style.opacity = this.isVisible ? 1 : 0;

      window.cancelAnimationFrame(this.raf);
    },
  },
  render() {
    return this.$slots.default ? this.$slots.default[0] : null;
  },
};
</script>
