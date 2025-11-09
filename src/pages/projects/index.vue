<script setup lang="ts">
import { supabase } from '@/lib/superbaseClient'
import type { Tables } from '@/types/types'
import { ref } from 'vue'

const projects = ref<Tables<'projects'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('projects').select()
  if (error) console.log(error)

  projects.value = data
})()
</script>

<template>
  <div>
    <h1>Projects Page</h1>
    <ul>
      <li v-for="project in projects" :key="project.id">
        <RouterLink :to="{ name: '/projects/[id]', params: { id: project.id } }"
          >Go to project {{ project.name }}</RouterLink
        >
      </li>
    </ul>
  </div>
</template>
