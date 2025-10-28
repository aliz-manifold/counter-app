<template>
  <div class="min-h-screen bg-slate-950 text-white p-6">
    <div class="max-w-[1920px] mx-auto mb-6">
      <h1 class="text-2xl font-bold mb-2">Driving Incident Review</h1>
      <div class="text-sm text-slate-400">
        <span v-if="currentEvent">Event ID: {{ currentEvent.id.substring(0, 8) }}...</span>
      </div>
    </div>

    <div v-if="loading" class="flex items-center justify-center h-96">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="currentEvent" class="max-w-[1920px] mx-auto space-y-6">
      <!-- Video Player Section -->
      <VideoPlayer :event="currentEvent" />

      <!-- Speed Graph Section -->
      <SpeedGraph :gps-metadata="currentEvent.gpsMetadata" />

      <!-- Reconstruction Map Section -->
      <ReconstructionMap :event="currentEvent" />

      <!-- Action Buttons -->
      <div class="flex gap-4 pb-8">
        <button
          @click="saveAnnotation"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded font-medium transition">
          Save & Next
        </button>
        <button
          @click="loadNextEvent"
          class="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded font-medium transition">
          Skip
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from './components/VideoPlayer.vue';
import SpeedGraph from './components/SpeedGraph.vue';
import ReconstructionMap from './components/ReconstructionMap.vue';

export default {
  name: 'App',
  components: {
    VideoPlayer,
    SpeedGraph,
    ReconstructionMap,
  },
  data() {
    return {
      loading: true,
      currentEvent: null,
    };
  },
  async mounted() {
    await this.loadNextEvent();
  },
  methods: {
    async loadNextEvent() {
      this.loading = true;
      try {
        const response = await fetch('/mock-data/next-event.json');
        const data = await response.json();
        this.currentEvent = data;
        this.loading = false;
      } catch (error) {
        console.error('Failed to load event:', error);
        this.loading = false;
      }
    },
    async saveAnnotation() {
      alert('Annotation saved!');
      await this.loadNextEvent();
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
