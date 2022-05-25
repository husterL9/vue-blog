<template>
  <div id="app">
    <h2>hello</h2>
    <router-link to="/showBlog">博客首页</router-link>
    <router-link to="/addBlog">add博客</router-link>
    <keep-alive include="showBlog">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import addBlog from "./pages/addBlog.vue"
import showBlog from './pages/showBlog.vue'
export default {
  name: 'App',
  components: { addBlog, showBlog },
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  font-size: 16px;
}
</style>
