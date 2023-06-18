<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useStore } from './stores/store'

const store = useStore()

const settings = localStorage.getItem('settings')

settings && store.setSettings(JSON.parse(settings))
</script>

<template>
  <RouterView />
</template>
