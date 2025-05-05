<template>
  <div>
    <Header></Header>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from 'src/components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  }
}
</script>