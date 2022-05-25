<template>
  <div id="add-blog">
    <h3>addBlog</h3>
    <form v-if="!submitted">
      <label for>博客标题</label>
      <input type="text" v-model="blog.title" required />
      <label for>博客内容</label>
      <textarea v-model="blog.content"></textarea>
      <div id="checkboxes">
        <label for>vue.js</label>
        <input type="checkbox" value="vue.js" v-model="blog.categories" />
        <label for>node.js</label>
        <input type="checkbox" value="node.js" v-model="blog.categories" />
        <label for>react.js</label>
        <input type="checkbox" value="react.js" v-model="blog.categories" />
        <label for>origin.js</label>
        <input type="checkbox" value="origin.js" v-model="blog.categories" />
      </div>
      <select v-model="blog.author">
        <option v-for="author in authors" :key="author">{{author}}</option>
      </select>
      <button v-on:click.prevent="post">发布博客</button>
    </form>

    <h3 v-if="submitted">发布成功</h3>

    <div class="preview">
      <h3>博客总览</h3>
      <p>博客标题:{{blog.title}}</p>
      <p>博客内容:{{blog.content}}</p>
      <p>博客分类</p>
      <ul>
        <li v-for="category in blog.categories" :key="category">{{category}}</li>
      </ul>
      <p>作者：{{blog.author}}</p>
    </div>
  </div>
</template>
<script>
import service from '../plugins/axios';
export default {
  name: "add-blog",
  data() {
    return {
      blog: {
        title: "",
        content: "",
        categories: [],
        author: "",
      },
      authors: ["ljw", "lzy"],
      submitted: false
    }
  },
  methods: {
    post() {
      console.log(this)
      service.post("/posts",
        {
          title: this.blog.title,
          body: this.blog.content,
          userId: 1,
        })
        .then((res) => {
          this.submitted = true
        })
    }
  }
}

</script>
<style scoped>
</style>