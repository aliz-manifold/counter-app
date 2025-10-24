<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Reconstruction Map</h3>
    </div>
    <div class="card-content">
      <div class="h-96 bg-slate-800/50 rounded flex items-center justify-center">
        <span class="text-slate-500 text-sm">Reconstruction map editor (not implemented)</span>
      </div>

      <!-- BUG: Placeholder toolbar that doesn't do anything -->
      <div class="mt-4 flex gap-2">
        <button
          class="px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm hover:border-slate-600 transition">
          🚗 Add Vehicle
        </button>
        <button
          class="px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm hover:border-slate-600 transition">
          📍 Add Marker
        </button>
        <button
          class="px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm hover:border-slate-600 transition">
          ↗️ Draw Path
        </button>
        <button
          class="px-3 py-2 bg-slate-800 border border-slate-700 rounded text-sm hover:border-slate-600 transition">
          🗑️ Clear
        </button>
      </div>

      <!-- Instructions placeholder -->
      <div class="mt-4 p-3 bg-blue-900/20 border border-blue-700/30 rounded text-sm text-blue-300">
        <p class="font-medium mb-1">Instructions:</p>
        <ul class="text-xs space-y-1 text-blue-400">
          <li>• Use the toolbar to add vehicles, markers, and draw trajectories</li>
          <li>• Click and drag to position elements on the map</li>
          <li>• This feature requires implementation</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReconstructionMap',
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        vehicles: [],
        markers: [],
        paths: [],
      }),
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      mapData: {
        vehicles: [],
        markers: [],
        paths: [],
      },
    };
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
