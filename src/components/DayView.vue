<template>
  <div class="day-view">
    <h3>{{ date.toDateString() }}</h3>

    <div v-if="eventsForDay.length">
      <div v-for="event in eventsForDay" :key="event.id" class="day-event">• {{ event.title }}</div>
    </div>
    <div v-else>
      <p>No events for today</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface EventItem {
  id: number
  date: Date
  title: string
}

const props = defineProps<{
  date: Date
  events: EventItem[]
}>()

const eventsForDay = computed<EventItem[]>(() =>
  props.events.filter((e) => new Date(e.date).toDateString() === props.date.toDateString()),
)
</script>
