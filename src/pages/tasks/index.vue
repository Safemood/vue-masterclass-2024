<script setup lang="ts">
import { supabase } from '@/lib/superbaseClient'
import type { Tables } from './../../../supabase/types'
import { ref } from 'vue'

const tasks = ref<Tables<'tasks'>[] | null>(null)

;(async () => {
  const { data, error } = await supabase.from('tasks').select()
  if (error) console.log(error)

  tasks.value = data
})()
</script>

<template>
  <div>
    <h1>Projects Page</h1>
    <ul>
      <li v-for="tasks in tasks" :key="tasks.id">
        <RouterLink :to="{ name: '/tasks/[id]', params: { id: tasks.id } }"
          >Go to tasks {{ tasks.name }}</RouterLink
        >
      </li>
    </ul>
  </div>
</template>
