<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Questions</h3>
    </div>
    <div class="card-content space-y-4">
      <div v-for="(question, index) in questions" :key="index"
           class="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-3">
        <label class="text-base font-medium">{{ index + 1 }}. {{ question.text }}</label>
        <div class="flex gap-2">
          <button
            @click="updateResponse(question.key, 'true')"
            :class="['px-6 py-2 rounded border transition min-w-[100px]',
              responses[question.key] === 'true'
                ? 'bg-blue-600 border-blue-500'
                : 'bg-slate-800 border-slate-700 hover:border-slate-600']">
            Yes
          </button>
          <button
            @click="updateResponse(question.key, 'false')"
            :class="['px-6 py-2 rounded border transition min-w-[100px]',
              responses[question.key] === 'false'
                ? 'bg-blue-600 border-blue-500'
                : 'bg-slate-800 border-slate-700 hover:border-slate-600']">
            No
          </button>
        </div>
      </div>

      <!-- Event Risk Score Calculator -->
      <RiskScoreCalculator
        :responses="responses"
        :incidents="incidents"
        @update:riskScore="$emit('risk-score-updated', $event)" />
    </div>
  </div>
</template>

<script>
import RiskScoreCalculator from './RiskScoreCalculator.vue';

export default {
  name: 'QuestionsCard',
  components: {
    RiskScoreCalculator,
  },
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
    incidents: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue', 'risk-score-updated'],
  data() {
    return {
      responses: {},
      questions: [
        { key: 'CONGESTED', text: 'Is it Congested?' },
        { key: 'HEAVY_WEATHER', text: 'Is there Heavy Rain or Snow?' },
        { key: 'NIGHT_TIME', text: 'Is it Daytime/Night?' },
        { key: 'HIGH_SPEED', text: 'Is it Incident at High Speed?' },
      ],
    };
  },
  methods: {
    updateResponse(key, value) {
      this.responses[key] = value;
      // Should emit the entire responses object
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
