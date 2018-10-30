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
      is: !isAbsoluteUrl && this.to ? 'router-link' : this.to ? 'a' : 'span',
      smartTo: this.to ? this.to : undefined,
      href: isAbsoluteUrl ? this.to : undefined,
      target: isAbsoluteUrl ? '_blank' : undefined,
    };
  },
};
</script>

<template>
  <component
    :is="is"
    :to="smartTo"
    :href="href"
    :target="target"
  >
    <slot/>
  </component>
</template>
