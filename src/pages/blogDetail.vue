<template>
  <div id="blogDetail">
    <h2>{{"这是id为"+id+"的博客"}}</h2>
    <p>{{blog.content}}</p>
  </div>
</template>
<script>
import service from '../plugins/axios';
export default {
  name: "blog-detail",
  data() {
    return {
      id: this.$route.params.id,
      blog: {}
    }
  },
  methods: {

  },
  created() {
    this.id = this.$route.params.id
    service.get("/blogDetail/" + this.id)
      .then((res) => {
        this.blog = res.data.blog
      })
  },
}
</script>
<style scoped>
#blogDetail {
  max-width: 800px;
  background: rgb(150, 142, 142);
  border: 2px dotted;
}
</style>