<template>
  <div class="card">
    <div class="card-header flex justify-between items-center">
      <h3 class="card-title">Incident Ratings And Intensity</h3>
      <button @click="addIncident" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium">
        + Add Incident
      </button>
    </div>
    <div class="card-content">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-700">
              <th class="text-left py-3 px-4 text-xs font-semibold uppercase text-slate-400">Incident Type</th>
              <th class="text-left py-3 px-4 text-xs font-semibold uppercase text-slate-400 w-24">Provider</th>
              <th class="text-left py-3 px-4 text-xs font-semibold uppercase text-slate-400">Accuracy</th>
              <th class="text-left py-3 px-4 text-xs font-semibold uppercase text-slate-400">Intensity</th>
              <th class="w-16"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(incident, index) in localIncidents" :key="index"
                class="border-b border-slate-800 hover:bg-slate-800/30">
              <td class="py-3 px-4">
                <select
                  v-model="incident.name"
                  :disabled="incident.fromTsp"
                  @change="onIncidentTypeChange(incident)"
                  class="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-blue-500 disabled:opacity-50">
                  <option value="">Select Event</option>
                  <option v-for="type in availableTypes" :key="type.translatedType" :value="type.translatedType">
                    {{ type.translatedType }}
                  </option>
                </select>
              </td>
              <td class="py-3 px-4">
                <span v-if="incident.fromTsp" class="inline-block px-2 py-1 bg-blue-600/30 text-blue-300 rounded text-xs font-medium">
                  TSP
                </span>
              </td>
              <td class="py-3 px-4">
                <div v-if="incident.fromTsp && incident.name !== 'Manual Selection'" class="flex gap-1">
                  <button
                    @click="incident.accuracy = 0"
                    :class="['px-3 py-1 rounded text-xs font-medium border transition',
                      incident.accuracy === 0
                        ? 'bg-green-600/30 border-green-600 text-white'
                        : 'bg-slate-800 border-slate-700 hover:border-slate-600']">
                    Accurate
                  </button>
                  <button
                    @click="incident.accuracy = 1"
                    :class="['px-3 py-1 rounded text-xs font-medium border transition',
                      incident.accuracy === 1
                        ? 'bg-red-600/30 border-red-600 text-white'
                        : 'bg-slate-800 border-slate-700 hover:border-slate-600']">
                    Inaccurate
                  </button>
                </div>
                <span v-else class="text-slate-500">-</span>
              </td>
              <td class="py-3 px-4">
                <div v-if="shouldShowIntensity(incident)" class="flex gap-1">
                  <button
                    v-for="option in [0, 1, 2]" :key="option"
                    @click="incident.intensity = option"
                    :class="['px-3 py-1 rounded text-xs font-medium border transition',
                      incident.intensity === option
                        ? 'bg-blue-600/30 border-blue-600 text-white'
                        : 'bg-slate-800 border-slate-700 hover:border-slate-600']">
                    {{ ['Not Intense', 'Intense', 'Very Intense'][option] }}
                  </button>
                </div>
                <span v-else class="text-slate-500">-</span>
              </td>
              <td class="py-3 px-4 text-right">
                <button
                  v-if="!incident.fromTsp"
                  @click="removeIncident(index)"
                  class="p-2 text-red-500 hover:bg-red-500/10 rounded">
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
  name: 'IncidentRatings',
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    incidentTypes: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      localIncidents: [],
    };
  },
  computed: {
    availableTypes() {
      return this.incidentTypes.filter(t => t.jumpFromQueue === false);
    },
  },
  watch: {
    modelValue: {
      handler(newVal) {
        this.localIncidents = JSON.parse(JSON.stringify(newVal));
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    shouldShowIntensity(incident) {
      if (!incident.name) return false;

      // TSP incidents only show intensity if accurate
      if (incident.fromTsp && incident.accuracy !== 0) {
        return false;
      }

      const incidentType = this.incidentTypes.find(t => t.translatedType === incident.name);
      return incidentType?.hasIntensity === true;
    },
    addIncident() {
      this.localIncidents.push({
        name: '',
        intensity: 0,
        accuracy: null,
        fromTsp: false,
      });
    },
    removeIncident(index) {
      this.localIncidents.splice(index, 1);
    },
    onIncidentTypeChange(incident) {
      // Reset intensity when type changes
      incident.intensity = 0;
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
