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
    const isUri =
      typeof this.to === 'string' &&
      /^(https?:\/\/|mailto:|tel:)/.test(this.to);
    const isExternal = isUri && /^(https?:\/\/)/.test(this.to);
    return {
      isUri,
      isExternal,
    };
  },
};
</script>

<template>
  <router-link v-if="!isUri && to" :to="to">
    <slot />
  </router-link>
  <component
    :is="to ? 'a' : 'span'"
    v-else
    :href="isUri ? to : undefined"
    :target="isUri && isExternal ? '_blank' : undefined"
  >
    <slot />
  </component>
</template>
