<template>
    <div class="common-layout">
        当前页:{{$route.query.name }}
  </div>
</template>

<script lang="ts" setup>
const text = ref('我是动态内容')
</script>