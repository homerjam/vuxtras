<script>
/**
 * vextras/responsive-background-image
 *
 * Usage:
 *
 * <rb-img style="background-size: cover">
 *  <img src="image.jpg" srcset="image.jpg 500w, image@2x.jpg 1000w">
 * </rb-img>
 *
 */

export default {
  props: {
    opacityEnabled: {
      type: Boolean,
      default: true,
    },
    classEnabled: {
      type: Boolean,
      default: true,
    },
    loadedDelay: {
      type: Number,
      default: -1,
    },
    loadedClass: {
      type: String,
      default: 'rbi-loaded',
    },
    notLoadedClass: {
      type: String,
      default: 'rbi-not-loaded',
    },
  },
  data() {
    return {
      isLoaded: false,
    };
  },
  computed: {
    getClass() {
      if (!this.classEnabled) {
        return '';
      }
      return this.isLoaded ? this.loadedClass : this.notLoadedClass;
    },
    getStyle() {
      if (!this.opacityEnabled) {
        return {};
      }
      return this.isLoaded ? { opacity: 1 } : { opacity: 0 };
    },
  },
  mounted() {
    this.img = this.$el.querySelector('img');
    this.img.style.opacity = 0;
    this.img.addEventListener('load', this.update);
    if (this.img.complete) {
      this.update();
    }
  },
  methods: {
    update() {
      if (!this.isLoaded) {
        if (this.loadedDelay > -1) {
          setTimeout(() => {
            this.isLoaded = true;
            this.$emit('loaded', this.$el);
          }, this.loadedDelay);
        } else {
          this.isLoaded = true;
          this.$emit('loaded', this.$el);
        }
      }

      const src = typeof this.img.currentSrc !== 'undefined' ? this.img.currentSrc : this.img.src;

      if (this.src !== src) {
        this.src = src;
        this.$el.style.backgroundImage = `url("${this.src}")`;
      }
    },
  },
};
</script>

<template>
  <div
    :class="getClass"
    :style="getStyle"
  >
    <slot/>
  </div>
</template>
