<script>
/**
 * vuxtras/smart-link
 *
 * Use absolute or relative urls interchangeably
 *
 * Usage:
 *
 * <smart-link :to="'http://external.com'">
 *
 *  <img src="image.jpg">
 *
 * </smart-link>
 *
 * <smart-link :to="'/internal'">
 *
 *  <img src="image.jpg">
 *
 * </smart-link>
 *
 */

export default {
  props: {
    to: {
      type: [String, Object],
      default: '',
    },
  },
  data() {
    const isAbsoluteUrl = typeof this.to === 'string' && /^http/.test(this.to);
    return {
      isAbsoluteUrl,
    };
  },
};
</script>

<template>
  <router-link
    v-if="!isAbsoluteUrl && this.to"
    :to="to"
  >
    <slot/>
  </router-link>
  <component
    v-else
    :is="this.to ? 'a' : 'span'"
    :href="isAbsoluteUrl ? this.to : undefined"
    :target="isAbsoluteUrl ? '_blank' : undefined"
  >
    <slot/>
  </component>
</template>
