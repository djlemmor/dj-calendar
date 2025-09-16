<template>
  <div>
    <!-- Select dropdown -->
    <select
      :name="label"
      :id="label"
      v-model="internalValue"
      @change="emitChange"
      class="border rounded-md px-3 py-3 border-gray-300 shadow-sm sm:text-sm bg-[#181818] text-white"
    >
      <option disabled value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { SelectOption } from '@/types/select'

// Props we accept from parent
const props = defineProps<{
  modelValue: string | number | null
  options: SelectOption[]
  label?: string
  placeholder?: string
}>()

// Events to emit
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
}>()

// Local state for v-model
import { computed } from 'vue'

// Create a computed property that syncs with parent
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

function emitChange() {
  emit('update:modelValue', internalValue.value)
}
</script>
