<template>
  <div class="min-h-screen bg-slate-950 text-white p-6">
    <!-- Header -->
    <div class="max-w-[1920px] mx-auto mb-6">
      <h1 class="text-2xl font-bold mb-2">Rate this Video</h1>
      <div class="flex items-center gap-4 text-sm text-slate-400">
        <span>⏱️ Time Remaining: {{ displayTime }}</span>
        <span v-if="currentEvent">Event ID: {{ currentEvent.id.substring(0, 8) }}...</span>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center h-96">
      <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <!-- Main Content -->
    <div v-else-if="currentEvent" class="max-w-[1920px] mx-auto space-y-6">
      <!-- Top Section: Video + Questions + GPS Chart -->
      <div class="grid grid-cols-1 2xl:grid-cols-2 gap-6">
        <VideoPlayer :event="currentEvent" @video-loaded="onVideoLoaded" />

        <div class="space-y-6">
          <QuestionsCard
            v-model="questionResponses"
            :incidents="incidents"
            @risk-score-updated="updateRiskScore"
          />

          <!-- GPS Speed Data Card -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">GPS Speed Data</h3>
            </div>
            <div class="card-content">
              <div class="h-48 bg-slate-800/50 rounded flex items-center justify-center">
                <span class="text-slate-500 text-sm">GPS Speed Chart (not implemented)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Incident Ratings And Intensity -->
      <IncidentRatings
        v-model="incidents"
        :incident-types="incidentTypes"
      />

      <!-- Vehicle and Location Information -->
      <VehicleInfoCard :event="currentEvent" />

      <!-- Accident-specific sections -->
      <div v-if="isAccident" class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DriverFault v-model="nofaultAccident" />

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Posted Speed Limit</h3>
          </div>
          <div class="card-content">
            <input
              v-model.number="postedSpeedLimit"
              type="number"
              placeholder="Enter speed in mph"
              class="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-blue-500"
            >
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Impact</h3>
          </div>
          <div class="card-content">
            <div class="h-32 bg-slate-800/50 rounded flex items-center justify-center">
              <span class="text-slate-500 text-sm">Impact diagram (not implemented)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Cost Estimate -->
      <CostEstimate v-if="isAccident" v-model="costEstimate" />

      <!-- Speed Graph -->
      <SpeedGraph v-if="isAccident" v-model="speedGraphPoints" />

      <!-- Injury and Objects -->
      <div v-if="isAccident" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InjuryInformation v-model="injuryEntries" />
        <ObjectsStruck v-model="objectsStruck" />
      </div>

      <!-- Reconstruction Map -->
      <ReconstructionMap v-if="isAccident" v-model="reconstructionData" />

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-4 pb-8">
        <button
          @click="saveAnnotation"
          :disabled="annotationLoading"
          class="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded font-medium transition">
          {{ annotationLoading ? 'Saving...' : 'Save' }}
        </button>

        <button
          @click="skipAnnotation"
          :disabled="skipping"
          class="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded font-medium transition">
          {{ skipping ? 'Skipping...' : 'Skip' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from './components/VideoPlayer.vue';
import QuestionsCard from './components/QuestionsCard.vue';
import IncidentRatings from './components/IncidentRatings.vue';
import VehicleInfoCard from './components/VehicleInfoCard.vue';
import DriverFault from './components/DriverFault.vue';
import CostEstimate from './components/CostEstimate.vue';
import SpeedGraph from './components/SpeedGraph.vue';
import InjuryInformation from './components/InjuryInformation.vue';
import ObjectsStruck from './components/ObjectsStruck.vue';
import ReconstructionMap from './components/ReconstructionMap.vue';
import { useTimer } from './composables/useTimer';
import * as validators from './utils/validators';

export default {
  name: 'AnnotationPage',
  components: {
    VideoPlayer,
    QuestionsCard,
    IncidentRatings,
    VehicleInfoCard,
    DriverFault,
    CostEstimate,
    SpeedGraph,
    InjuryInformation,
    ObjectsStruck,
    ReconstructionMap,
  },
  data() {
    return {
      loading: true,
      currentEvent: null,
      incidentTypes: [],

      // Annotation data
      incidents: [],
      questionResponses: {},
      riskScore: null,
      nofaultAccident: null,
      postedSpeedLimit: null,
      costEstimate: {
        currentCostOfVehicle: null,
        estimatedDamageToVehicle: null,
      },
      speedGraphPoints: [],
      injuryEntries: [],
      objectsStruck: [],
      reconstructionData: {
        vehicles: [],
        markers: [],
        paths: [],
      },

      // Loading states
      annotationLoading: false,
      skipping: false,
    };
  },
  setup() {
    const { displayTime, startCountdown, stopTimer, extendTime, resetTimer } = useTimer(5);

    return {
      displayTime,
      startCountdown,
      stopTimer,
      extendTime,
      resetTimer,
    };
  },
  computed: {
    isAccident() {
      return this.incidents.some(i =>
        i.name === 'Accident' && (i.accuracy === 0 || !i.fromTsp)
      );
    },
  },
  watch: {
    isAccident(newValue, oldValue) {
      if (newValue && !oldValue) {
        console.log('Accident detected - should extend timer to 30 minutes');
      }
    },
  },
  async mounted() {
    await this.loadIncidentTypes();
    await this.loadNextEvent();
    this.startCountdown();
  },
  methods: {
    async loadIncidentTypes() {
      try {
        const response = await fetch('/mock-data/incident-types.json');
        this.incidentTypes = await response.json();
      } catch (error) {
        console.error('Failed to load incident types:', error);
      }
    },
    async loadNextEvent() {
      this.loading = true;
      try {
        const response = await fetch('/mock-data/next-event.json');
        const data = await response.json();

        this.currentEvent = data;

        // Load TSP incidents from metadata
        const tspEvents = (data.metaData || [])
          .filter(m => m.eventMetadataType === 1 && m.tspIncidentTag !== null)
          .map(m => ({
            name: m.translatedIncidentType,
            intensity: m.annotatedIncidentIntensity || 0,
            accuracy: m.tspIncidentTag,
            fromTsp: true,
            providerId: m.providerId,
          }));

        this.incidents = tspEvents;

        // Reset form
        this.questionResponses = {};
        this.nofaultAccident = null;
        this.postedSpeedLimit = null;
        this.costEstimate = {
          currentCostOfVehicle: null,
          estimatedDamageToVehicle: null,
        };
        this.speedGraphPoints = [];
        this.injuryEntries = [];
        this.objectsStruck = [];
        this.reconstructionData = {
          vehicles: [],
          markers: [],
          paths: [],
        };

        this.loading = false;
      } catch (error) {
        console.error('Failed to load event:', error);
        this.loading = false;
      }
    },
    validateAnnotation() {
      const questions = ['CONGESTED', 'HEAVY_WEATHER', 'NIGHT_TIME', 'HIGH_SPEED'];

      // Check questions
      for (const q of questions) {
        if (!this.questionResponses[q]) {
          alert('Please answer all questions.');
          return false;
        }
      }

      // Check TSP accuracy
      for (const incident of this.incidents) {
        if (incident.fromTsp && incident.name !== 'Manual Selection' && incident.accuracy === null) {
          alert('Please select accuracy for all TSP incidents.');
          return false;
        }
      }

      // Check accident fields
      if (this.isAccident && this.nofaultAccident === null) {
        alert('Please select driver fault status.');
        return false;
      }

      return true;
    },
    async saveAnnotation() {
      if (!this.validateAnnotation()) return;

      this.annotationLoading = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Annotation saved successfully!');
        await this.loadNextEvent();
      } catch (error) {
        console.error('Save failed:', error);
        alert('Failed to save annotation.');
      } finally {
        this.annotationLoading = false;
      }
    },
    async skipAnnotation() {
      this.skipping = true;
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        await this.loadNextEvent();
      } finally {
        this.skipping = false;
      }
    },
    updateRiskScore(score) {
      this.riskScore = score;
    },
    onVideoLoaded(duration) {
      console.log('Video loaded with duration:', duration);
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
