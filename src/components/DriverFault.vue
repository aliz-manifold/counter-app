<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Driver's Fault?</h3>
    </div>
    <div class="card-content">
      <div class="flex gap-3">
        <button
          @click="selectFault('at_fault')"
          :class="buttonClass('at_fault')">
          At Fault
        </button>
        <button
          @click="selectFault('no_fault')"
          :class="buttonClass('no_fault')">
          No Fault
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DriverFault',
  props: {
    modelValue: {
      type: String,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      selectedFault: null,
    };
  },
  watch: {
    modelValue: {
      handler(newVal) {
        this.selectedFault = newVal;
      },
      immediate: true,
    },
  },
  methods: {
    selectFault(fault) {
      this.selectedFault = fault;
    },
    buttonClass(fault) {
      const isSelected = this.selectedFault === fault;
      const baseClasses = 'flex-1 py-3 rounded border transition font-medium';

      if (fault === 'at_fault') {
        return [
          baseClasses,
          isSelected
            ? 'bg-red-600 border-red-500'
            : 'bg-slate-800 border-slate-700 hover:border-slate-600'
        ];
      } else {
        return [
          baseClasses,
          isSelected
            ? 'bg-green-600 border-green-500'
            : 'bg-slate-800 border-slate-700 hover:border-slate-600'
        ];
      }
    },
  },
};
</script>

<style scoped>
.card {
  @apply bg-slate-900 border border-slate-800 rounded-lg overflow-hidden;
}

.card-header {
  @apply p-4 border-b border-slate-800;
}

.card-title {
  @apply text-lg font-semibold;
}

.card-content {
  @apply p-4;
}
</style>
