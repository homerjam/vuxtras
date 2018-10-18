<script>
/**
 * vuxtras/responsive-background-image
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
    dropShadow: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isLoaded: false,
      src: undefined,
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
    dropShadowOptions() {
      return Object.assign({
        enabled: false,
        color: 'black',
        opacity: 0.5,
        size: 4,
        padding: [0.02, 0.02, 0.02, 0.02],
        offsetX: 0,
        offsetY: 0,
      }, this.dropShadow);
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

        if (!this.dropShadowOptions.enabled) {
          this.$el.style.backgroundImage = `url("${this.src}")`;
        }
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
  <svg
    v-if="dropShadowOptions.enabled"
    width="100%"
    height="100%"
  >
    <defs>
      <filter id="rbi-shadow">
        <feDropShadow
          :dx="dropShadowOptions.offsetX"
          :dy="dropShadowOptions.offsetY"
          :stdDeviation="dropShadowOptions.size"
          :flood-color="dropShadowOptions.color"
          :flood-opacity="dropShadowOptions.opacity"
        />
      </filter>
    </defs>
    <image
      :xlink:href="src"
      :x="(dropShadowOptions.padding[3] * 100) + '%'"
      :y="(dropShadowOptions.padding[0] * 100) + '%'"
      :width="100 - (dropShadowOptions.padding[3] * 100) - (dropShadowOptions.padding[1] * 100) + '%'"
      :height="100 - (dropShadowOptions.padding[0] * 100) - (dropShadowOptions.padding[2] * 100) + '%'"
      style="filter:url(#rbi-shadow);"
    />
  </svg>
  <slot/>
</div>
</template>
