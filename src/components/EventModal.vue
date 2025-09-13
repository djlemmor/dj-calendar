<script setup lang="ts">
import { ref, watch } from 'vue'

interface EventItem {
  id: number
  date: Date
  title: string
}

const props = defineProps<{
  show: boolean
  selectedDate: Date | null
}>()

const emits = defineEmits<{
  (e: 'save', event: EventItem): void
  (e: 'close'): void
}>()

const title = ref<string>('')

watch(
  () => props.show,
  (val) => {
    if (val) title.value = ''
  },
)

function saveEvent() {
  if (title.value.trim() && props.selectedDate) {
    emits('save', {
      id: Date.now(),
      date: props.selectedDate,
      title: title.value,
    })
  }
}
</script>

<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal">
      <h3>Add Event</h3>
      <p>Date: {{ selectedDate?.toDateString() }}</p>

      <input type="text" v-model="title" placeholder="Event title" />

      <div class="modal-actions">
        <button @click="saveEvent">Save</button>
        <button @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
}
.modal-actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
</style>
