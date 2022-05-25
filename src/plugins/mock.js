import Mock from 'mockjs'
const {
    blogs
} = Mock.mock({
    "blogs|95": [{
        id: "@increment",
        title: "@ctitle()",
        content: "@cparagraph(5,10)",
        "categories|1-4": ["vue.js", "node.js", "react.js", "origin.js"],
        "author|1": ["ljw", "lzy"],
    }, ],
})

function getQuery(url, name) {
    var index = url.indexOf('?')
    var paramStr = url.substr(index + 1)
    var paramArr = paramStr.split('&')
    for (let index = 0; index < paramArr.length; index++) {
        var arr = paramArr[index].split('=')
        if (arr[0] == name) {
            return arr[1]
        }
    }
    throw new Error("参数不匹配")
}

function getID(url) {
    var index = url.lastIndexOf('/')
    return url.substr(index + 1)
}
Mock.mock(/\/blogDetail/, "get", (options) => {
    var id = getID(options.url)
    var blog = blogs.filter((blog) => blog.id == id)
    var blog = blog[0]
    console.log(blog);
    return {
        status: 200,
        message: "getDetail成功",
        blog,
    };
})
Mock.mock(/\/api\/get\/blogs/, "get", (options) => {
    var pagenum = getQuery(options.url, "pagenum")
    var pagesize = getQuery(options.url, "pagesize")
    const start = (pagenum - 1) * pagesize;
    const end = pagesize * pagenum;
    const totalPage = Math.ceil(blogs.length / pagesize);
    const subBlogs = pagenum > totalPage ? [] : blogs.slice(start, end);

    return {
        status: 200,
        message: "添加成功",
        blogs: subBlogs,
        total: totalPage,
        currentPage: pagenum,
        pagesize,
        totalItem: blogs.length
    };
})