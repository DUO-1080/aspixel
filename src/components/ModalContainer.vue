<template>
  <teleport to="#modal">
    <div v-if="open" @click.capture="close" class="absolute top-0 left-0 h-screen w-screen bg-transparent z-40">
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
  },
  emits: ['close'],
  setup(props, context) {

    const close = () => {
      console.log('modal close');
      context.emit('close');
    };

    return {
      close,
    };
  },
};
</script>

<style scoped>

</style>
