/**
 * nuxt.js 配置文件
 */
module.exports = {
    router: {
        // 精确匹配激活的路由的类名
        linkExactActiveClass: "active",
        // 自定义路由表规则
        extendRoutes(routes, resolve) {
            // 清空nuxt.js基于pages目录默认生成的路由表规则
            routes.splice(0)
            // 自己重新配置
            routes.push(
                ...[
                    {
                        path: "/",
                        component: resolve(__dirname, "pages/layout/"),
                        children: [
                            {
                                path: "", //默认子路由
                                name: "home",
                                component: resolve(__dirname, "pages/home/"),
                            },
                            {
                                path: "login",
                                name: "login",
                                component: resolve(__dirname, "pages/login"),
                            },
                            {
                                path: "register",
                                name: "register",
                                component: resolve(__dirname, "pages/login"),
                            },
                            {
                                path: "profile/:username",
                                name: "profile",
                                component: resolve(__dirname, "pages/profile"),
                            },
                            {
                                path: "settings",
                                name: "settings",
                                component: resolve(__dirname, "pages/settings"),
                            },
                            {
                                path: "editor",
                                name: "editor",
                                component: resolve(__dirname, "pages/editor"),
                            },
                            {
                                path: "article/:slug",
                                name: "article",
                                component: resolve(__dirname, "pages/article"),
                            },
                        ],
                    },
                ]
            )
        },
    },
    // 注册插件
    plugins: [
        "~/plugins/request.js",
        "~/plugins/filters.js"
    ],
}
