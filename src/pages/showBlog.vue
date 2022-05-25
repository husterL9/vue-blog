<template>
  <div id="show-blog">
    <h2>博客总览</h2>
    <input type="text" v-model="search" placeholder="搜索" />
    <div v-for="blog in filterBlogs" class="blogs" :key="blog.id">
      <router-link :to="'/blog/'+blog.id">
        <h4>{{blog.title}}</h4>
        <article>{{blog.content.slice(0,10)+"..."}}</article>
      </router-link>
    </div>

    <van-pagination
      v-model="currentPage"
      :total-items="50"
      :show-page-size="5"
      :page-count="pageCount"
      @change="pageChange"
    >
      <template #prev-text>
        <van-icon name="arrow-left" />
      </template>
      <template #next-text>
        <van-icon name="arrow" />
      </template>
      <template #page="{ text: boolean }">{{boolean}}</template>
    </van-pagination>
  </div>
</template>
<script>
import service from '../plugins/axios';
import {
  Pagination, Icon
} from 'vant';
export default {
  name: "show-blog",
  components: {
    [Pagination.name]: Pagination,
    [Icon.name]: Icon
  },
  data() {
    return {

      blogs: [],
      search: "",
      currentPage: 1,
      pageSize: 10,
      pageCount: '',
      totalItem: '',
      rememberScroll: 0
    }
  },
  computed: {
    filterBlogs() {

      return this.blogs.filter((blog) => blog.title.match(this.search))
    }
  },
  created() {
    service.get("/api/get/blogs?pagenum=1&pagesize=10")
      .then((res) => {
        console.log(res)
        this.blogs = res.data.blogs
        this.pageCount = res.data.total
        this.totalItem = res.data.totalItem
      })
  },
  beforeRouteLeave(to, from, next) {
    this.rememberScroll = document.documentElement.scrollTop;
    next();
  },
  // 缓存组件激活时调用
  activated() {
    document.documentElement.scrollTop = this.rememberScroll
  },
  methods: {
    pageChange(page) {
      this.currentPage = page
      const params = "?pagenum=" + this.currentPage + "&pagesize=" + this.pageSize
      const requestUrl = "/api/get/blogs" + params
      service.get(requestUrl)
        .then((res) => {
          console.log(res)
          this.blogs = res.data.blogs
        })
    },
  }
}
  // activated() {
  //   document.documentElement.scrollTop = this.rememberScroll
  // },


  // beforeRouteEnter(to, from, next) {

  //   if (from.path === "/addBlog") {//addBlog返回时
  //     console.log(to, to.meta.scollTopPosition)
  //     document.documentElement.scrollTop = to.meta.scollTopPosition + 500;
  //     next()
  //   } else {
  //     next()
  //   }

  // },
  // beforeRouteLeave(to, from, next) {

  //   //在离开时修改keepAlive值
  //   from.meta.keepAlive = true

  //   from.meta.scollTopPosition = document.documentElement.scrollTop;//document.body.scrollTop
  //   console.log(from, document.documentElement.scrollTop)
  //   next();

  //   // } else {
  //   //   //如果不是进入addBlog界面则销毁
  //   //   from.meta.keepAlive = false;
  //   //   from.meta.scollTopPosition = 0
  //   //   this.$destroy()
  //   //   next();
  //   // }

  // }
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
#show-blog {
  max-width: 800px;
  margin: 0;
}
a {
  text-decoration: none;
}
.blogs {
  background-color: pink;
}
.blogs h4 {
  margin-top: 30px;
  font-size: 18px;
  color: white;
}
.blogs article {
  margin-top: 2px;
  font-size: 26px;
  color: rgb(207, 185, 185);
  background-color: rgb(97, 94, 94);
}
input[type="text"] {
  width: 100%;
  border: palevioletred 2px dotted;
  border-radius: 2px;
  font-size: 24px;
  height: 28px;
}
</style>