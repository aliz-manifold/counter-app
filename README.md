# Frontend Developer Challenge: Event Annotation Platform

## Overview
Build and fix a video annotation platform for reviewing driving incident events. This challenge focuses on **3 key features** that need implementation and debugging.

**Time Limit**: 45 minutes (coding) + 10-15 min (discussion)
**Difficulty**: Intermediate

## Prerequisites

- **Node.js**: v18+ or v20+ required
- **npm**: v9+ or v10+
- Vue 3 knowledge (Options API)
- HTML5 Video API familiarity
- Canvas API basics (for reconstruction map)

## The Challenge

You have **3 incomplete components** to fix and implement:

### 1. Video Player (Picture-in-Picture & Side-by-Side)
**Reference**: `public/mock-data/video-player.png`

**Requirements:**
- Load videos from mock API response (`event.incident.videos`)
- Two viewing modes: Picture-in-Picture and Side-by-Side
- Sync timeline across all videos when playing
- Handle videos of different lengths (use longest as timeline duration)
- Thumbnail carousel for quick camera switching

**Current Issues:**
- Videos array is empty - not loading from props
- No timeline synchronization between videos
- PiP secondary video doesn't have controls
- Mode switching doesn't work properly

### 2. Speed Graph (Chart + Table Sync)
**Reference**: `public/mock-data/speed-graph.png`

**Requirements:**
- Table to add/edit/remove speed data points
- Chart visualization that auto-updates when table changes
- Color-code accident events (accident_start, impact, accident_end)
- Load initial data from GPS metadata prop

**Current Issues:**
- Chart area shows "not implemented" placeholder
- No visualization of data points
- Adding points to table doesn't update chart
- No color coding for accident events
- GPS metadata prop not used to initialize data

### 3. Reconstruction Map (Leaflet + Canvas)
**Reference**: `public/mock-data/reconstruction-map.png`

**Requirements:**
- **Left side**: Leaflet map with Google Maps layer
- **Right side**: Canvas drawing area
- Sync map zoom/position with canvas background
- Toolbar to select elements (insured car, other party, pedestrian, marker)
- Click canvas to place selected element
- Elements should be draggable and deletable

**Current Issues:**
- Leaflet map not initialized
- Canvas has no drawing functionality
- No zoom/position sync between map and canvas
- Element placement doesn't work
- No drag-and-drop functionality

## Getting Started

```bash
npm install
npm run dev
# Open http://localhost:5173
```

**Start by**: Opening browser console - check for errors and missing data!

## File Structure

```
src/
├── App.vue                     # Main container (loads data from API)
├── components/
│   ├── VideoPlayer.vue         # Videos with dual-mode viewing
│   ├── SpeedGraph.vue          # Chart + table for speed data
│   └── ReconstructionMap.vue   # Leaflet map + canvas drawing
public/mock-data/
├── next-event.json             # Mock event data with videos/GPS
├── video-player.png            # Reference image for video player
├── speed-graph.png             # Reference image for speed graph
└── reconstruction-map.png      # Reference image for map
```

## Success Criteria

**Minimum (to pass):**
- ✅ Video player loads and displays videos from API
- ✅ Timeline sync works in at least one viewing mode
- ✅ Speed graph table adds/removes points
- ✅ Basic chart visualization shows data points

**Bonus (impressive):**
- ✅ Both video modes work with proper sync
- ✅ Chart updates in real-time and color-codes events
- ✅ Leaflet map initializes with correct location
- ✅ Canvas allows basic element placement
- ✅ Map/canvas zoom sync implemented

## Key Technologies You'll Use

- **Vue 3** - Component structure and reactivity
- **HTML5 Video API** - For timeline sync (`video.currentTime`, `timeupdate` event)
- **Leaflet.js** - Map rendering (install with `npm install leaflet`)
- **Canvas API** - Drawing and element placement
- **Chart.js or similar** - Speed graph visualization (your choice)

## Tips

- Read the mock data structure first (`/mock-data/next-event.json`)
- Check component props - data might already be passed but not used
- Video sync: Listen to `timeupdate` event on one video, update others
- Chart: Start simple (line chart), then add event markers
- Leaflet: Initialize with GPS coordinates from event data
- You can use AI tools to help with implementation

## Tech Stack

Vue 3 • Tailwind CSS • Vite • HTML5 APIs • Leaflet • Canvas

---

**Remember**: Focus on getting things working, then refine. Partial implementations are better than nothing!
