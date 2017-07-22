<template>
  <div class="monitor">

    <monitor-view></monitor-view>
    
  </div>
</template>

<script>
import MonitorList from '@/components/modules/MonitorList'
export default {
  name: 'monitor',
  components: {
    'monitor-view': MonitorList,
  },
  data () { return {} }
}
</script>

<style scoped lang="stylus">
@import "../../assets/stylus/_settings"

.monitor
  padding 0 $global-margin + 10px $global-margin $global-margin
  min-height 550px
</style>