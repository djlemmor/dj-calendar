<template>
  <button
    :type="type"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium shadow-sm cursor-pointer transition',
      variantClasses,
      fullWidth ? 'w-full' : '',
    ]"
  >
    <!-- Left Icon -->
    <slot name="iconLeft" />

    <!-- Button text -->
    <slot />

    <!-- Right Icon -->
    <slot name="iconRight" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Props definition
const props = defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  fullWidth?: boolean
}>()

// ✅ Defaults
const type = props.type ?? 'button'

// ✅ Compute variant classes reactively
const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-blue-600 text-white hover:bg-blue-700'
    case 'secondary':
      return 'bg-gray-100 text-blue-600 hover:bg-gray-200'
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700'
    case 'outline':
      return 'border border-gray-300 text-gray-700 hover:bg-gray-100'
    default:
      return 'bg-gray-200 text-black'
  }
})
</script>
