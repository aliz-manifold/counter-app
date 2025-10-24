<template>
  <div class="card">
    <div class="card-header flex justify-between items-center">
      <h3 class="card-title">Objects Struck</h3>
      <button
        @click="addObject"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium">
        + Add Object
      </button>
    </div>
    <div class="card-content">
      <div v-if="objects.length === 0" class="text-slate-500 text-sm text-center py-8">
        No objects struck added
      </div>
      <div v-else class="space-y-4">
        <div v-for="(object, index) in objects" :key="index"
             class="p-4 bg-slate-800/50 rounded border border-slate-700">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            <div>
              <label class="block text-xs text-slate-400 mb-1">Object Type</label>
              <select
                v-model="object.type"
                class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-blue-500">
                <option value="">Select type</option>
                <option value="vehicle">Vehicle</option>
                <option value="pedestrian">Pedestrian</option>
                <option value="animal">Animal</option>
                <option value="fixed_object">Fixed Object</option>
                <option value="debris">Debris</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-slate-400 mb-1">Impact Severity</label>
              <select
                v-model="object.severity"
                class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-blue-500">
                <option value="">Select severity</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="heavy">Heavy</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-slate-400 mb-1">Estimated Damage ($)</label>
              <input
                v-model.number="object.damage"
                type="number"
                placeholder="0"
                class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-blue-500">
            </div>
          </div>
          <div class="mb-3">
            <label class="block text-xs text-slate-400 mb-1">Notes</label>
            <textarea
              v-model="object.notes"
              rows="2"
              placeholder="Additional details about the object struck..."
              class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <div class="flex justify-end">
            <button
              @click="removeObject(index)"
              class="p-2 text-red-500 hover:bg-red-500/10 rounded text-sm">
              🗑️ Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ObjectsStruck',
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      objects: [],
    };
  },
  watch: {
    modelValue: {
      handler(newVal) {
        this.objects = JSON.parse(JSON.stringify(newVal));
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    addObject() {
      this.objects.push({
        type: '',
        severity: '',
        damage: null,
        notes: '',
      });
    },
    removeObject(index) {
      this.objects.splice(index, 1);
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
