<template>
  <header>
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col h-16 items-center justify-between sm:flex-row gap-y-4">
        <div class="text-blue-500 text-3xl !font-bold">DJ Calendar</div>

        <div class=" ">
          <nav aria-label="Global">
            <ul class="flex items-center gap-4 text-sm">
              <li>
                <a class="text-gray-500 transition hover:text-gray-500/75" href="#">
                  Month: {{ selectedMonth }}</a
                >
              </li>

              <li>
                <a class="text-gray-500 transition hover:text-gray-500/75" href="#">
                  Year: {{ selectedYear }}
                </a>
              </li>
              <li>
                <BaseSelect
                  v-model="selectedMonth"
                  :options="monthOptions"
                  label="Month"
                  placeholder="Select month"
                />
              </li>
              <li>
                <BaseSelect
                  v-model="selectedYear"
                  :options="yearOptions"
                  label="Year"
                  placeholder="Select year"
                />
              </li>
            </ul>
          </nav>
        </div>

        <div class="flex items-center gap-4">
          <button
            class="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm cursor-pointer"
          >
            Add Event
          </button>

          <button
            class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-600 cursor-pointer"
          >
            Print
          </button>
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
          'bg-blue-700 text-white': isToday(day.value), // highlight today
        }"
      >
        {{ day.label }}
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import { monthOptions, yearOptions } from '@/types/select'
import type { SelectOption } from '@/types/select'

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
</script>
