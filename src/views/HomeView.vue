<template>
  <header>
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col h-16 items-center justify-between sm:flex-row gap-y-4">
        <div class="text-blue-500 text-3xl !font-bold">DJ Calendar</div>

        <div class=" ">
          <nav aria-label="Global">
            <ul class="flex items-center gap-4 text-sm">
              <!-- Previous Month Button -->
              <li>
                <BaseButton variant="outline" @click="goToPreviousMonth">
                  <template #iconLeft>
                    <IconLeftArrow />
                  </template>
                  Prev
                </BaseButton>
              </li>

              <!-- Month Select -->
              <li>
                <BaseSelect
                  v-model="selectedMonth"
                  :options="monthOptions"
                  label="Month"
                  placeholder="Select month"
                />
              </li>

              <!-- Year Select -->
              <li>
                <BaseSelect
                  v-model="selectedYear"
                  :options="yearOptions"
                  label="Year"
                  placeholder="Select year"
                />
              </li>

              <!-- Next Month Button -->
              <li>
                <BaseButton variant="outline" @click="goToNextMonth">
                  Next
                  <template #iconRight>
                    <IconRightArrow />
                  </template>
                </BaseButton>
              </li>
            </ul>
          </nav>
        </div>

        <div class="flex items-center gap-4">
          <BaseButton variant="primary" @click="openAddEvent">
            Add Event
            <template #iconRight>
              <IconPlus />
            </template>
          </BaseButton>
          <BaseButton variant="secondary" @click="printCalendar">
            Print
            <template #iconRight>
              <IconPrinter />
            </template>
          </BaseButton>
        </div>
      </div>
    </div>
  </header>

  <main class="p-4">
    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-2 text-center">
      <!-- Weekday headers -->
      <div
        v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
        :key="day"
        class="font-semibold text-gray-500"
      >
        {{ day }}
      </div>

      <!-- Empty slots before the 1st of the month -->
      <div v-for="n in firstDayOfMonth" :key="'empty-' + n"></div>

      <!-- Actual days -->
      <div
        v-for="day in dayOptions"
        :key="day.value"
        class="p-2 rounded-md cursor-pointer hover:bg-blue-500"
        :class="{
          'bg-blue-700 text-white': isToday(day.value),
        }"
        @click.stop="openAddEventForDay(day.value)"
      >
        <div>{{ day.label }}</div>

        <!-- Show events for this date -->
        <ul class="text-xs text-left mt-1 flex flex-col gap-y-2">
          <li
            v-for="event in eventsForDay(day.value)"
            :key="event.id"
            class="truncate bg-purple-500 text-white px-1 rounded uppercase"
            @click.stop="openEditEventForDay(event)"
          >
            {{ event.title }}
          </li>
        </ul>
      </div>
    </div>
  </main>

  <!-- Add Event Modal -->
  <div
    v-if="showAddEvent"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-96 flex flex-col gap-y-4 relative">
      <!-- Close button -->
      <button
        @click="closeAddEvent"
        class="absolute top-3 right-3 cursor-pointer text-gray-500 hover:text-gray-700"
      >
        <IconClose />
      </button>

      <h2 class="text-lg font-bold mb-4">Add Event</h2>
      <input
        v-model="newEventTitle"
        type="text"
        placeholder="Event title"
        class="w-full border rounded p-2 mb-4"
      />

      <input v-model="newEventDate" type="date" class="w-full border rounded p-2 mb-4" />

      <div class="flex justify-end gap-2">
        <BaseButton variant="secondary" @click="closeAddEvent">Cancel</BaseButton>
        <BaseButton variant="primary" @click="saveEvent">Save</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { monthOptions, yearOptions } from '@/types/select'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import IconPrinter from '@/components/icons/IconPrinter.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue'
import IconRightArrow from '@/components/icons/IconRightArrow.vue'
import IconClose from '@/components/icons/IconClose.vue'
import type { SelectOption } from '@/types/select'
import type { CalendarEvent } from '@/types/calendar'

// Get today's date
const today = new Date()

// Month (1–12)
const selectedMonth = ref<number>(today.getMonth() + 1)

// Year
const selectedYear = ref<number>(today.getFullYear())

// Function to generate days for the selected month + year
function getDateOptions(year: number, month: number): SelectOption[] {
  const lastDay = new Date(year, month, 0).getDate()
  return Array.from({ length: lastDay }, (_, i) => ({
    label: (i + 1).toString(),
    value: (i + 1) as number,
  }))
}

// Reactive computed days (updates when month/year changes)
const dayOptions = computed(() => getDateOptions(selectedYear.value, selectedMonth.value))

// First weekday of the selected month/year
const firstDayOfMonth = computed(() => {
  return new Date(selectedYear.value, selectedMonth.value - 1, 1).getDay()
})

// Highlight today
function isToday(day: number): boolean {
  return (
    day === today.getDate() &&
    selectedMonth.value === today.getMonth() + 1 &&
    selectedYear.value === today.getFullYear()
  )
}

function printCalendar() {
  window.print()
}

function goToPreviousMonth() {
  if (selectedMonth.value === 1) {
    // Wrap around to December of the previous year
    selectedMonth.value = 12
    selectedYear.value -= 1
  } else {
    selectedMonth.value -= 1
  }
}

function goToNextMonth() {
  if (selectedMonth.value === 12) {
    // Wrap around to January of the next year
    selectedMonth.value = 1
    selectedYear.value += 1
  } else {
    selectedMonth.value += 1
  }
}

const events = ref<CalendarEvent[]>([])
const nextEventId = ref(1)

const showAddEvent = ref(false)
const newEventTitle = ref('')
const newEventDate = ref('')

// Open modal
function openAddEvent() {
  newEventTitle.value = ''
  newEventDate.value = ''
  showAddEvent.value = true
}

// Close modal
function closeAddEvent() {
  showAddEvent.value = false
}

// Save event
function saveEvent() {
  if (!newEventTitle.value || !newEventDate.value) {
    alert('Please enter title and date')
    return
  }

  events.value.push({
    id: nextEventId.value++,
    title: newEventTitle.value,
    date: newEventDate.value,
  })

  console.log('Events:', events.value) // ✅ Debug log
  closeAddEvent()
}

function eventsForDay(day: number) {
  const date = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  return events.value.filter((e) => e.date === date)
}

function openAddEventForDay(day: number) {
  // Format date as yyyy-mm-dd
  const date = `${selectedYear.value}-${String(selectedMonth.value).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  newEventTitle.value = ''
  newEventDate.value = date // 👈 Pre-fill with the clicked day
  showAddEvent.value = true

  console.log('openAddEventForDay')
}

function openEditEventForDay(event: CalendarEvent) {
  newEventTitle.value = event.title // 👈 Pre-fill title with the clicked day
  newEventDate.value = event.date // 👈 Pre-fill date with the clicked day
  showAddEvent.value = true
}

watch([selectedMonth, selectedYear], ([m, y]) => {
  console.log('Month:', m, 'Year:', y)
})
</script>
