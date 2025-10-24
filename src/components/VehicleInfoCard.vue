<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Vehicle and Location Information</h3>
    </div>
    <div class="card-content">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- BUG: Data is mapped incorrectly - labels don't match values -->
        <div>
          <div class="text-xs text-slate-400 mb-1">VEHICLE ID</div>
          <div class="font-medium">Unassigned, (00219)</div>
        </div>
        <div>
          <div class="text-xs text-slate-400 mb-1">VEHICLE</div>
          <!-- BUG: Should show full VIN, showing partial -->
          <div class="font-medium">1GCWVG</div>
        </div>
        <div>
          <div class="text-xs text-slate-400 mb-1">COMPANY</div>
          <div class="font-medium">CHEVROLET</div>
        </div>
        <div>
          <div class="text-xs text-slate-400 mb-1">TYPE</div>
          <!-- BUG: Showing model instead of type -->
          <div class="font-medium">Express</div>
        </div>
        <div>
          <div class="text-xs text-slate-400 mb-1">CONSTRUCTION YEAR</div>
          <!-- BUG: Showing type instead of construction year -->
          <div class="font-medium">TRUCK</div>
        </div>
        <div>
          <div class="text-xs text-slate-400 mb-1">FUEL TYPE</div>
          <!-- BUG: Showing year instead of fuel type -->
          <div class="font-medium">2020</div>
        </div>
        <div>
          <div class="text-xs text-slate-400 mb-1">BODY CLASS</div>
          <!-- BUG: Showing fuel type instead of body class -->
          <div class="font-medium">Gasoline</div>
        </div>
        <div>
          <div class="text-xs text-slate-400 mb-1">TYPE</div>
          <!-- BUG: Showing body class instead of type, duplicate label -->
          <div class="font-medium">Cargo Van</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VehicleInfoCard',
  props: {
    event: {
      type: Object,
      required: true,
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
