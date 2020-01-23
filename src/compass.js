/**
 * vuxtras/compass
 *
 * Mouse compass component, adds classes based on mouse position
 *
 * Usage:
 *
 * <compass east="0.3" west="0.3">
 *
 *  <img src="image.jpg">
 *
 * </compass>
 *
 */

export default {
  props: {
    north: {
      type: Number,
      default: 0.5,
    },
    south: {
      type: Number,
      default: 0.5,
    },
    east: {
      type: Number,
      default: 0.5,
    },
    west: {
      type: Number,
      default: 0.5,
    },
  },
  methods: {
    mousemove(event) {
      const rect = this.$el.getBoundingClientRect();

      const direction = {
        north: rect.y + rect.height * this.north,
        south: rect.y + rect.height - rect.height * this.south,
        east: rect.x + rect.width - rect.width * this.east,
        west: rect.x + rect.width * this.west,
      };

      if (event.pageX <= direction.west) {
        this.$el.classList.remove('east');
        this.$el.classList.add('west');
      }
      if (event.pageX > direction.west) {
        this.$el.classList.remove('west');
      }

      if (event.pageX >= direction.east) {
        this.$el.classList.remove('west');
        this.$el.classList.add('east');
      }
      if (event.pageX < direction.east) {
        this.$el.classList.remove('east');
      }

      if (event.pageY <= direction.north) {
        this.$el.classList.remove('south');
        this.$el.classList.add('north');
      }
      if (event.pageY > direction.north) {
        this.$el.classList.remove('north');
      }

      if (event.pageY >= direction.south) {
        this.$el.classList.remove('north');
        this.$el.classList.add('south');
      }
      if (event.pageY < direction.south) {
        this.$el.classList.remove('south');
      }
    },
  },
  mounted() {
    this.$el.addEventListener('mousemove', this.mousemove);
  },
  destroyed() {
    this.$el.removeEventListener('mousemove', this.mousemove);
  },
  render() {
    return this.$slots.default[0];
  },
};
