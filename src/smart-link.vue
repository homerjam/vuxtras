<script>
export default {
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
  },
  data() {
    const isAbsoluteUrl = typeof this.to === 'string' && /^http/.test(this.to);
    return {
      is: isAbsoluteUrl ? 'a' : 'router-link',
      href: isAbsoluteUrl ? this.to : undefined,
      target: isAbsoluteUrl ? '_blank' : undefined,
    };
  },
};
</script>

<template>
  <component
    :is="is"
    :to="to"
    :href="href"
    :target="target"
  >
    <slot/>
  </component>
</template>
