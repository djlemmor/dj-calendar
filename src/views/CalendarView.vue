<template>
  <div class="calendar-container">
    <CalendarHeader
      :month="currentMonth"
      :year="currentYear"
      :months="months"
      :years="years"
      @update:month="
        (m) => {
          currentMonth = m
          generateCalendar()
        }
      "
      @update:year="
        (y) => {
          currentYear = y
          generateCalendar()
        }
      "
      @today="goToToday"
      @change-view="(v) => (view = v)"
      @print="printCalendar"
    />

    <CalendarGrid
      v-if="view === 'month'"
      :days="calendarDays"
      :events="events"
      @add-event="openModal"
    />

    <YearView v-if="view === 'year'" :year="currentYear" :months="months" />

    <DayView v-if="view === 'day'" :date="today" :events="events" />

    <EventModal
      :show="showModal"
      :selectedDate="selectedDate"
      @close="showModal = false"
      @save="saveEvent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CalendarHeader from '../components/CalendarHeader.vue'
import CalendarGrid from '../components/CalendarGrid.vue'
import EventModal from '../components/EventModal.vue'
import YearView from '../components/YearView.vue'
import DayView from '../components/DayView.vue'

interface CalendarDay {
  date: Date
}

interface EventItem {
  id: number
  date: Date
  title: string
}

const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
const years: number[] = Array.from({ length: 50 }, (_, i) => 2000 + i)

const today = new Date()
const currentMonth = ref<number>(today.getMonth())
const currentYear = ref<number>(today.getFullYear())
const view = ref<'day' | 'month' | 'year'>('month')

const calendarDays = ref<CalendarDay[]>([])
const events = ref<EventItem[]>([{ id: 1, date: new Date(), title: 'My First Event' }])

const showModal = ref<boolean>(false)
const selectedDate = ref<Date | null>(null)

function generateCalendar() {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const days: CalendarDay[] = []

  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    days.push({ date: new Date(d) })
  }
  calendarDays.value = days
}

function goToToday() {
  currentMonth.value = today.getMonth()
  currentYear.value = today.getFullYear()
  generateCalendar()
}

function openModal(date: Date) {
  selectedDate.value = date
  showModal.value = true
}

function saveEvent(event: EventItem) {
  events.value.push(event)
  showModal.value = false
}

function printCalendar() {
  window.print()
}

generateCalendar()
</script>

<style scoped>
.calendar-container {
  max-width: 800px;
  margin: auto;
}
</style>
