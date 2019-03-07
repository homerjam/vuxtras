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
    const isUri = typeof this.to === 'string' && /^(https?:\/\/|mailto:|tel:)/.test(this.to);
    const isExternal = isUri && /^(https?:\/\/)/.test(this.to);
    return {
      isUri,
      isExternal,
    };
  },
};
</script>

<template>
  <router-link
    v-if="!isUri && this.to"
    :to="to"
  >
    <slot/>
  </router-link>
  <component
    v-else
    :is="this.to ? 'a' : 'span'"
    :href="isUri ? this.to : undefined"
    :target="isUri && isExternal ? '_blank' : undefined"
  >
    <slot/>
  </component>
</template>
