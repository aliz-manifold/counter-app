<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Reconstruction Map</h3>
    </div>
    <div class="card-content">
      <div class="grid grid-cols-2 gap-4">
        <!-- Left: Leaflet Map (not implemented) -->
        <div class="h-96 bg-slate-800/50 rounded flex flex-col items-center justify-center">
          <span class="text-slate-500 text-sm mb-2">Leaflet Map Not Initialized</span>
          <span class="text-slate-600 text-xs">Should show Google Maps layer</span>
        </div>

        <!-- Right: Canvas Drawing Area (not implemented) -->
        <div class="h-96 bg-slate-800/50 rounded relative flex flex-col items-center justify-center">
          <canvas
            ref="canvas"
            class="absolute inset-0 w-full h-full"
            @click="handleCanvasClick">
          </canvas>
          <span class="text-slate-500 text-sm mb-2">Canvas Drawing Not Implemented</span>
          <span class="text-slate-600 text-xs">Should allow placing elements</span>
        </div>
      </div>

      <!-- Toolbar -->
      <div class="mt-4 flex gap-2">
        <button
          @click="selectedTool = 'insured'"
          :class="['px-3 py-2 rounded text-sm', selectedTool === 'insured' ? 'bg-blue-600' : 'bg-slate-700']">
          🚗 Insured Car
        </button>
        <button
          @click="selectedTool = 'other'"
          :class="['px-3 py-2 rounded text-sm', selectedTool === 'other' ? 'bg-blue-600' : 'bg-slate-700']">
          🚙 Other Party
        </button>
        <button
          @click="selectedTool = 'pedestrian'"
          :class="['px-3 py-2 rounded text-sm', selectedTool === 'pedestrian' ? 'bg-blue-600' : 'bg-slate-700']">
          🚶 Pedestrian
        </button>
        <button
          @click="selectedTool = 'marker'"
          :class="['px-3 py-2 rounded text-sm', selectedTool === 'marker' ? 'bg-blue-600' : 'bg-slate-700']">
          📍 Marker
        </button>
        <button
          @click="clearCanvas"
          class="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm ml-auto">
          🗑️ Clear
        </button>
      </div>

      <!-- Instructions -->
      <div class="mt-4 p-3 bg-blue-900/20 border border-blue-700/30 rounded text-sm">
        <p class="text-blue-300 font-medium mb-1">Instructions:</p>
        <ul class="text-xs text-blue-400 space-y-1">
          <li>• Left side: Leaflet map should sync zoom/position with canvas background</li>
          <li>• Right side: Click canvas to place selected element</li>
          <li>• Elements should be draggable and deletable</li>
          <li>• Map background on canvas should match leaflet view</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReconstructionMap',
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedTool: 'insured',
      elements: [],
    };
  },
  methods: {
    handleCanvasClick(event) {
      // Not implemented: should place element at click position
      console.log('Canvas clicked at:', event.offsetX, event.offsetY);
    },
    clearCanvas() {
      this.elements = [];
      // Not implemented: should clear canvas drawing
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
