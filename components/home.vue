<template>
    <div class="common-layout">
      当前页:{{ props.fatherMessage }}
  </div>
</template>

<script lang="ts" setup>
const text = ref('我是动态内容')
import { toRefs, defineProps } from 'vue'
const props = defineProps({
  //子组件接收父组件传递过来的值
  fatherMessage: String,
})
//使用父组件传递过来的值
console.log(props.fatherMessage)
</script>