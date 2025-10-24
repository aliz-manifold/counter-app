<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Event Video</h3>
      <div class="flex gap-2">
        <button
          @click="viewMode = 'pip'"
          :class="['px-3 py-1 rounded text-sm', viewMode === 'pip' ? 'bg-blue-600' : 'bg-slate-700']">
          Picture in Picture
        </button>
        <button
          @click="viewMode = 'sidebyside'"
          :class="['px-3 py-1 rounded text-sm', viewMode === 'sidebyside' ? 'bg-blue-600' : 'bg-slate-700']">
          Side by Side
        </button>
      </div>
    </div>
    <div class="card-content">
      <!-- Picture in Picture Mode -->
      <div v-if="viewMode === 'pip'" class="relative">
        <video
          ref="mainVideo"
          class="w-full rounded"
          controls
          @timeupdate="syncTimeline">
          <source :src="videos[0]?.url" type="video/mp4">
        </video>
        <!-- Secondary video (broken implementation) -->
        <div class="absolute bottom-4 right-4 w-48">
          <video class="w-full rounded border-2 border-white">
            <source :src="videos[1]?.url" type="video/mp4">
          </video>
        </div>
      </div>

      <!-- Side by Side Mode (incomplete) -->
      <div v-else class="grid grid-cols-2 gap-4">
        <video
          ref="video1"
          class="w-full rounded"
          controls>
          <source :src="videos[0]?.url" type="video/mp4">
        </video>
        <video
          ref="video2"
          class="w-full rounded"
          controls>
          <source :src="videos[1]?.url" type="video/mp4">
        </video>
      </div>

      <!-- Thumbnails -->
      <div class="mt-4 flex gap-2">
        <div
          v-for="(video, index) in videos"
          :key="index"
          class="w-20 h-16 bg-slate-800 rounded cursor-pointer hover:ring-2 ring-blue-500">
          <img v-if="video.thumbnail" :src="video.thumbnail" class="w-full h-full object-cover rounded">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      viewMode: 'pip',
      videos: [],
    };
  },
  methods: {
    syncTimeline(event) {
      console.log('Current time:', event.target.currentTime);
    },
  },
};
</script>

<style scoped>
.card {
  @apply bg-slate-900 border border-slate-800 rounded-lg overflow-hidden;
}

.card-header {
  @apply p-4 border-b border-slate-800 flex justify-between items-center;
}

.card-title {
  @apply text-lg font-semibold;
}

.card-content {
  @apply p-4;
}
</style>
