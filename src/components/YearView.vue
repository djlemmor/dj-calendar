<template>
  <div class="year-view">
    <div v-for="month in 12" :key="month" class="mini-month">
      <h4>{{ months[month - 1] }}</h4>
      <div class="mini-grid">
        <div
          v-for="day in getDaysForMonth(month - 1)"
          :key="day.date.toISOString()"
          class="mini-day"
        >
          {{ day.date.getDate() }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CalendarDay {
  date: Date
}

const props = defineProps<{
  year: number
  months: string[]
}>()

function getDaysForMonth(month: number): CalendarDay[] {
  const firstDay = new Date(props.year, month, 1)
  const lastDay = new Date(props.year, month + 1, 0)
  const days: CalendarDay[] = []

  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    days.push({ date: new Date(d) })
  }
  return days
}
</script>
