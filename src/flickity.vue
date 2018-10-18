<script>
/**
 * vuxtras/flickity
 *
 * Flickity component
 *
 * Usage:
 *
 * data() {
 *  return {
 *    flickityOptions: {
 *      prevNextButtons: false,
 *      autoResize: true,
 *    }
 *  }
 * },
 * methods: {
 *  initFlickity(flickity) {
 *    flickity.on('select', () => {
 *      console.log('select');
 *    });
 *  }
 * }
 *
 * <flickity :options="flickityOptions" @init="initFlickity">
 *
 *  <div v-for="item in items" class="slide">
 *    ...
 *  </div>
 *
 * </flickity>
 *
 */

let Flickity;
if (process.browser) {
  // eslint-disable-next-line
  Flickity = require('flickity');
}

export default {
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    init() {
      this.flickity = new Flickity(this.$el, this.options);

      this.$emit('init', this.flickity);

      if (this.options.autoResize) {
        this.raf();
      }
    },
    raf() {
      if (this.width !== this.$el.clientWidth || this.height !== this.$el.clientHeight) {
        this.width = this.$el.clientWidth;
        this.height = this.$el.clientHeight;

        this.flickity.resize();
      }

      this.rafId = window.requestAnimationFrame(this.raf);
    },
  },
  mounted() {
    if (this.options.initDelay && this.options.initDelay > -1) {
      setTimeout(() => {
        this.init();
      }, this.options.initDelay);
    } else {
      this.init();
    }
  },
  afterDestroy() {
    this.flickity = null;

    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
    }
  },
};
</script>

<style>
/*! Flickity v2.1.2
https://flickity.metafizzy.co
---------------------------------------------- */

.flickity-enabled {
  position: relative;
}

.flickity-enabled:focus { outline: none; }

.flickity-viewport {
  overflow: hidden;
  position: relative;
  height: 100%;
}

.flickity-slider {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* draggable */

.flickity-enabled.is-draggable {
  -webkit-tap-highlight-color: transparent;
          tap-highlight-color: transparent;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
}

.flickity-enabled.is-draggable .flickity-viewport {
  cursor: move;
  cursor: -webkit-grab;
  cursor: grab;
}

.flickity-enabled.is-draggable .flickity-viewport.is-pointer-down {
  cursor: -webkit-grabbing;
  cursor: grabbing;
}

/* ---- flickity-button ---- */

.flickity-button {
  position: absolute;
  background: hsla(0, 0%, 100%, 0.75);
  border: none;
  color: #333;
}

.flickity-button:hover {
  background: white;
  cursor: pointer;
}

.flickity-button:focus {
  outline: none;
  box-shadow: 0 0 0 5px #19F;
}

.flickity-button:active {
  opacity: 0.6;
}

.flickity-button:disabled {
  opacity: 0.3;
  cursor: auto;
  /* prevent disabled button from capturing pointer up event. #716 */
  pointer-events: none;
}

.flickity-button-icon {
  fill: #333;
}

/* ---- previous/next buttons ---- */

.flickity-prev-next-button {
  top: 50%;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  /* vertically center */
  transform: translateY(-50%);
}

.flickity-prev-next-button.previous { left: 10px; }
.flickity-prev-next-button.next { right: 10px; }
/* right to left */
.flickity-rtl .flickity-prev-next-button.previous {
  left: auto;
  right: 10px;
}
.flickity-rtl .flickity-prev-next-button.next {
  right: auto;
  left: 10px;
}

.flickity-prev-next-button .flickity-button-icon {
  position: absolute;
  left: 20%;
  top: 20%;
  width: 60%;
  height: 60%;
}

/* ---- page dots ---- */

.flickity-page-dots {
  position: absolute;
  width: 100%;
  bottom: -25px;
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
  line-height: 1;
}

.flickity-rtl .flickity-page-dots { direction: rtl; }

.flickity-page-dots .dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 8px;
  background: #333;
  border-radius: 50%;
  opacity: 0.25;
  cursor: pointer;
}

.flickity-page-dots .dot.is-selected {
  opacity: 1;
}
</style>

<template>
<div>
  <slot></slot>
</div>
</template>
