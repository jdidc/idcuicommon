<template>
  <div id="app">
    <router-link to="/export-button">export-button</router-link> | 
    <router-link to="/description-list">description-list</router-link>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="less">
.main{
  margin: 20px;
}
</style>
