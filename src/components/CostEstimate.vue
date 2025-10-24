<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Cost Estimate</h3>
    </div>
    <div class="card-content">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm text-slate-400 mb-2">Current Cost of Vehicle</label>
          <input
            v-model.number="localEstimate.currentCostOfVehicle"
            type="number"
            placeholder="$0.00"
            class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-blue-500">
        </div>
        <div>
          <label class="block text-sm text-slate-400 mb-2">Estimated Damage to Vehicle</label>
          <input
            v-model.number="localEstimate.estimatedDamageToVehicle"
            type="number"
            placeholder="$0.00"
            class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-blue-500">
        </div>
      </div>

      <!-- BUG: Validation errors not displayed -->
      <div v-if="validationError" class="mt-3 text-red-400 text-sm">
        ⚠️ {{ validationError }}
      </div>

      <!-- Calculated total -->
      <div v-if="totalDamage > 0" class="mt-4 pt-4 border-t border-slate-700">
        <div class="flex justify-between items-center">
          <span class="text-slate-400">Total Estimated Damage:</span>
          <span class="text-xl font-bold text-white">
            ${{ totalDamage.toLocaleString() }}
          </span>
        </div>
        <!-- BUG: Percentage calculation is wrong -->
        <div class="text-xs text-slate-500 mt-1 text-right">
          {{ damagePercentage }}% of vehicle value
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CostEstimate',
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        currentCostOfVehicle: null,
        estimatedDamageToVehicle: null,
      }),
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      localEstimate: {
        currentCostOfVehicle: null,
        estimatedDamageToVehicle: null,
      },
    };
  },
  computed: {
    totalDamage() {
      return this.localEstimate.estimatedDamageToVehicle || 0;
    },
    damagePercentage() {
      if (!this.localEstimate.currentCostOfVehicle || !this.localEstimate.estimatedDamageToVehicle) {
        return 0;
      }
      return ((this.localEstimate.estimatedDamageToVehicle / this.localEstimate.currentCostOfVehicle) * 100).toFixed(1);
    },
    validationError() {
      return '';
    },
  },
  watch: {
    modelValue: {
      handler(newVal) {
        this.localEstimate = JSON.parse(JSON.stringify(newVal));
      },
      immediate: true,
      deep: true,
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
