<template>
  <teleport to="#modal">
    <div v-if="open" @click.capture="close" :style="{backgroundColor: $props.bg}"
         class="absolute flex items-center justify-center top-0 left-0 h-screen w-screen z-40">
      <slot>modal</slot>
    </div>
  </teleport>

</template>

<script>
export default {
  name: 'ModalContainer',
  props: {
    open: Boolean,
    position: Object,
    bg: {
      type: String,
      default: 'transparent',
    },
  },
  emits: ['close'],
  setup(props, context) {

    const close = (e) => {
      console.log('modal close');
      context.emit('close', e);
    };

    return {
      close,
    };
  },
};
</script>

<style scoped>

</style>
