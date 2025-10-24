<template>
  <div class="card">
    <div class="card-header flex justify-between items-center">
      <h3 class="card-title">Speed Graph</h3>
      <button
        @click="addPoint"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium">
        + Add Point
      </button>
    </div>
    <div class="card-content">
      <!-- Chart Area (not implemented) -->
      <div class="h-64 bg-slate-800/50 rounded mb-4 flex items-center justify-center">
        <span class="text-slate-500 text-sm">Chart visualization not implemented</span>
      </div>

      <!-- Data Table -->
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-700">
              <th class="text-left py-2 px-3 text-xs font-semibold uppercase text-slate-400">Time (s)</th>
              <th class="text-left py-2 px-3 text-xs font-semibold uppercase text-slate-400">Speed (mph)</th>
              <th class="text-left py-2 px-3 text-xs font-semibold uppercase text-slate-400">Event Type</th>
              <th class="w-16"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(point, index) in points" :key="index" class="border-b border-slate-800">
              <td class="py-2 px-3">
                <input
                  v-model.number="point.time"
                  type="number"
                  step="0.1"
                  class="w-20 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-sm">
              </td>
              <td class="py-2 px-3">
                <input
                  v-model.number="point.speed"
                  type="number"
                  class="w-20 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-sm">
              </td>
              <td class="py-2 px-3">
                <select
                  v-model="point.eventType"
                  class="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-sm">
                  <option value="">None</option>
                  <option value="accident_start">Accident Start</option>
                  <option value="impact">Impact</option>
                  <option value="accident_end">Accident End</option>
                </select>
              </td>
              <td class="py-2 px-3 text-right">
                <button
                  @click="removePoint(index)"
                  class="text-red-500 hover:text-red-400">
                  🗑️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpeedGraph',
  props: {
    gpsMetadata: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      points: [],
    };
  },
  methods: {
    addPoint() {
      this.points.push({
        time: 0,
        speed: 0,
        eventType: '',
      });
    },
    removePoint(index) {
      this.points.splice(index, 1);
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
