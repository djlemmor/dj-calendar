<template>
  <header>
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col h-16 items-center justify-between sm:flex-row gap-y-4">
        <div class="text-blue-500 text-3xl !font-bold">DJ Calendar</div>

        <div class=" ">
          <nav aria-label="Global">
            <ul class="flex items-center gap-4 text-sm">
              <li>
                <a class="text-gray-500 transition hover:text-gray-500/75" href="#"> Month </a>
              </li>

              <li>
                <a class="text-gray-500 transition hover:text-gray-500/75" href="#"> Year </a>
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
</template>

<script setup lang="ts"></script>
