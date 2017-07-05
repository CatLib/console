<template>
  <div class="console">

    <monitor-view :monitor-max-num="monitorMaxNum"></monitor-view>
    <console-view></console-view>
    
  </div>
</template>

<script>
import MonitorList from '@/components/modules/MonitorList'
import Console from '@/components/modules/Console'
export default {
  name: 'console',
  components: {
    'monitor-view': MonitorList,
    'console-view': Console,
  },
  data () { return { monitorMaxNum : 6 } }
}
</script>

<style scoped lang="stylus">
@import "../../assets/stylus/_settings"

.console
  padding 0 $global-margin + 10px $global-margin $global-margin
</style>