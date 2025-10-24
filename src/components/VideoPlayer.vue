<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Event Video</h3>
    </div>
    <div class="card-content">
      <!-- Video Player Placeholder -->
      <div class="bg-black rounded aspect-video flex items-center justify-center">
        <div class="text-center text-slate-500">
          <svg class="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-sm">Video Player</p>
          <p class="text-xs mt-1">Multi-camera sync not implemented</p>
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
      currentCamera: null,
      videos: [],
    };
  },
  mounted() {
    console.log('VideoPlayer mounted');
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
