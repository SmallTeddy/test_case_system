<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>
