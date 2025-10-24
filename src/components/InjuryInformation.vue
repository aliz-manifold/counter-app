<template>
  <div class="card">
    <div class="card-header flex justify-between items-center">
      <h3 class="card-title">Injury Information</h3>
      <button
        @click="addEntry"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium">
        + Add Entry
      </button>
    </div>
    <div class="card-content">
      <div v-if="entries.length === 0" class="text-slate-500 text-sm text-center py-8">
        No injury information added
      </div>
      <div v-else class="space-y-4">
        <div v-for="(entry, index) in entries" :key="index"
             class="p-4 bg-slate-800/50 rounded border border-slate-700">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <label class="block text-xs text-slate-400 mb-1">Injury Type</label>
              <select
                v-model="entry.type"
                class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-blue-500">
                <option value="">Select type</option>
                <option value="minor">Minor</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
                <option value="fatal">Fatal</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-slate-400 mb-1">Person Involved</label>
              <input
                v-model="entry.person"
                type="text"
                placeholder="e.g., Driver, Passenger"
                class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-blue-500">
            </div>
          </div>
          <div class="mb-3">
            <label class="block text-xs text-slate-400 mb-1">Description</label>
            <textarea
              v-model="entry.description"
              rows="2"
              placeholder="Describe the injury..."
              class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-blue-500"></textarea>
          </div>
          <div class="flex justify-end">
            <button
              @click="removeEntry(index)"
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
  name: 'InjuryInformation',
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      entries: [],
    };
  },
  watch: {
    modelValue: {
      handler(newVal) {
        this.entries = JSON.parse(JSON.stringify(newVal));
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    addEntry() {
      this.entries.push({
        type: '',
        person: '',
        description: '',
      });
    },
    removeEntry(index) {
      this.entries.splice(index, 1);
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
