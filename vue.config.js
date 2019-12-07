function resolve(dir) {//配置解析目录别名方法 node 语法
    return path.join(__dirname, dir)
}

module.exports = {
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {//配置别名路径
                '@': resolve('src'),
                'assets': '@/assets',
                'views':'@/views',
                'components':'@/components',
                'network':'@/network',
                'common':'@/common'
            }
        }
    },
}
