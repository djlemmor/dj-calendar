<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  month: number
  year: number
  months: string[]
  years: number[]
}

const props = defineProps<Props>()
const emits = defineEmits<{
  (e: 'update:month', value: number): void
  (e: 'update:year', value: number): void
  (e: 'today'): void
  (e: 'change-view', value: string): void
  (e: 'print'): void
}>()

const month = ref<number>(props.month)
const year = ref<number>(props.year)

watch(
  () => props.month,
  (val) => (month.value = val),
)
watch(
  () => props.year,
  (val) => (year.value = val),
)
</script>

<template>
  <div class="calendar-header">
    <select v-model="month" @change="$emit('update:month', month)">
      <option v-for="(m, i) in months" :key="i" :value="i">{{ m }}</option>
    </select>

    <select v-model="year" @change="$emit('update:year', year)">
      <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
    </select>

    <button @click="$emit('today')">Today</button>
    <button @click="$emit('change-view', 'day')">Day</button>
    <button @click="$emit('change-view', 'month')">Month</button>
    <button @click="$emit('change-view', 'year')">Year</button>
    <button @click="$emit('print')">Print</button>
  </div>
</template>

<style scoped>
.calendar-header {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
</style>
