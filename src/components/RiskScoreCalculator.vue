<template>
  <div class="card mt-4 bg-slate-800/50">
    <div class="card-header border-slate-700">
      <h4 class="text-base font-semibold">💫 Event Risk Score Calculator</h4>
    </div>
    <div class="card-content">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <div class="text-xs text-slate-400 mb-1">CALCULATED RISK SCORE</div>
          <div class="text-3xl font-bold text-red-500">{{ calculatedScore.toFixed(1) }}</div>
        </div>
        <div>
          <div class="text-xs text-slate-400 mb-1">EVENT RISK RATING</div>
          <span class="inline-block px-3 py-1 rounded text-sm font-medium bg-red-600">
            {{ riskLabel }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RiskScoreCalculator',
  props: {
    responses: {
      type: Object,
      default: () => ({}),
    },
    incidents: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:riskScore'],
  computed: {
    calculatedScore() {
      // Real algorithm should consider:
      // - Base score for behavioral incidents (0.5)
      // - Heavy weather (+0.5)
      // - Night time (+0.5)
      // - High speed (+0.5)
      // - Multiple incidents (+0.5)
      // - Incident intensity (up to +2.0)
      // - Congestion (+0.5)
      // - Near collision (automatic HIGH = 4.0)
      // - Accident (automatic CRITICAL = 5.0)

      let score = 0;

      if (this.incidents.some(i => i.name)) {
        score += 0.5;
      }

      if (this.responses.HEAVY_WEATHER === 'true') score += 0.5;
      if (this.responses.NIGHT_TIME === 'true') score += 0.5;
      if (this.responses.HIGH_SPEED === 'true') score += 0.5;


      return score;
    },
    riskLabel() {
      const score = this.calculatedScore;
      if (score >= 4) return 'Critical';
      if (score >= 3) return 'High';
      if (score >= 2) return 'Medium';
      if (score >= 1) return 'Low';
      return 'Very Low';
    },
  },
  watch: {
    calculatedScore(newScore) {
      this.$emit('update:riskScore', newScore);
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

.card-content {
  @apply p-4;
}
</style>
