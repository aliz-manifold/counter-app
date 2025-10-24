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
      <div class="h-64 bg-slate-800/50 rounded flex items-center justify-center relative">
        <span class="text-slate-500 text-sm">Speed graph editor (not implemented)</span>

        <!-- BUG: Points display but no actual graph rendering -->
        <div v-if="points.length > 0" class="absolute top-2 right-2 text-xs text-slate-400">
          {{ points.length }} points added
        </div>
      </div>

      <!-- Points list -->
      <div v-if="points.length > 0" class="mt-4 space-y-2">
        <div class="text-xs text-slate-400 mb-2">Timeline Points:</div>
        <div v-for="(point, index) in points" :key="index"
             class="flex items-center gap-3 p-3 bg-slate-800/50 rounded border border-slate-700">
          <div class="flex-1 grid grid-cols-3 gap-3">
            <div>
              <label class="block text-xs text-slate-400 mb-1">Time (seconds)</label>
              <input
                v-model.number="point.time"
                type="number"
                step="0.1"
                placeholder="0.0"
                class="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-sm focus:outline-none focus:border-blue-500">
            </div>
            <div>
              <label class="block text-xs text-slate-400 mb-1">Speed (mph)</label>
              <input
                v-model.number="point.speed"
                type="number"
                placeholder="0"
                class="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-sm focus:outline-none focus:border-blue-500">
            </div>
            <div>
              <label class="block text-xs text-slate-400 mb-1">Event</label>
              <select
                v-model="point.event"
                class="w-full px-2 py-1 bg-slate-800 border border-slate-700 rounded text-sm focus:outline-none focus:border-blue-500">
                <option value="">None</option>
                <option value="accident_start">Accident Start</option>
                <option value="impact">Impact</option>
                <option value="accident_end">Accident End</option>
              </select>
            </div>
          </div>
          <button
            @click="removePoint(index)"
            class="p-2 text-red-500 hover:bg-red-500/10 rounded">
            🗑️
          </button>
        </div>
      </div>

      <!-- BUG: Validation not implemented -->
      <div v-if="hasValidationError" class="mt-3 text-red-400 text-sm">
        ⚠️ {{ validationError }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpeedGraph',
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      points: [],
    };
  },
  computed: {
    hasValidationError() {
      return false;
    },
    validationError() {
      return '';
    },
  },
  watch: {
    modelValue: {
      handler(newVal) {
        this.points = JSON.parse(JSON.stringify(newVal));
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    addPoint() {
      this.points.push({
        time: 0,
        speed: 0,
        event: '',
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
