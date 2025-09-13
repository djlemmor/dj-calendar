<script setup lang="ts">
interface CalendarDay {
  date: Date
}

interface EventItem {
  id: number
  date: Date
  title: string
}

const props = defineProps<{
  days: CalendarDay[]
  events: EventItem[]
}>()

const emits = defineEmits<{
  (e: 'add-event', date: Date): void
}>()

function getEventsForDay(date: Date): EventItem[] {
  return props.events.filter((e) => new Date(e.date).toDateString() === date.toDateString())
}
</script>

<template>
  <div class="calendar-grid">
    <div v-for="day in days" :key="day.date.toISOString()" class="day-cell">
      <div class="date-label">{{ day.date.getDate() }}</div>

      <div v-for="event in getEventsForDay(day.date)" :key="event.id" class="event">
        {{ event.title }}
      </div>

      <button class="add-event" @click="$emit('add-event', day.date)">+</button>
    </div>
  </div>
</template>

<style scoped>
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}
.day-cell {
  border: 1px solid #ccc;
  padding: 5px;
  min-height: 80px;
  position: relative;
}
.date-label {
  font-weight: bold;
  margin-bottom: 4px;
}
.event {
  background: lightblue;
  margin-top: 3px;
  padding: 2px;
  border-radius: 4px;
  font-size: 12px;
}
.add-event {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 12px;
}
</style>
