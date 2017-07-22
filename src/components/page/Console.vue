<template>
  <div class="console">

    <monitor-view :monitor-max-num="monitorMaxNum"></monitor-view>
    <console-view></console-view>
    
  </div>
</template>

<script>
import MonitorBlock from '@/components/modules/MonitorBlock'
import Console from '@/components/modules/Console'
export default {
  name: 'console',
  components: {
    'monitor-view': MonitorBlock,
    'console-view': Console,
  },
  data () { return { monitorMaxNum : 6 } }
}
</script>

<style scoped lang="stylus">
@import "../../assets/stylus/_settings"

.console
  padding 0 $global-margin + 10px $global-margin $global-margin
  min-height 550px
</style>