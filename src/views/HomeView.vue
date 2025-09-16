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
          'bg-blue-700 text-white': isToday(day.value), // highlight today
        }"
      >
        {{ day.label }}
      </div>
    </div>
  </main>
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

function openAddEvent() {
  console.log('Add Event clicked!')
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

watch([selectedMonth, selectedYear], ([m, y]) => {
  console.log('Month:', m, 'Year:', y)
})
</script>
