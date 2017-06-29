<template>
  <div id="app">
    <nav-view></nav-view>
    <router-view></router-view>
  </div>
</template>

<script>
import '@/assets/stylus/base.styl'
import Nav from '@/components/Nav'
export default {
  name: 'app',
  components: {
    'nav-view': Nav,
  }
}
</script>