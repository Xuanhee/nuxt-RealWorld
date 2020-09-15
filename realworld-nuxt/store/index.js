// 如果是服务端引入第三方插件解析cookie
const cookieParser = process.server ? require("cookieparser") : undefined

// 在服务端渲染期间运行都是同一个实例
// 为了防止数据重提,务必把state定义成一个函数,返回数据对象
export const state = () => {
    return {
        // 当前登录用户的登录状态
        user: null,
    }
}

export const mutations = {
    setUser(state, data) {
        state.user = data
    },
}

export const actions = {
    // nuxtServerInit 是一个特殊的action方法
    // 这个action 会在服务端渲染期间自动调用
    nuxtServerInit({ commit }, { req }) {
        let user = null
        // 如果请求头中有Cookie
        if (req.headers.cookie) {
            // 使用 cookieparser 把 cookie 字符串转为 javascript对象
            const parsed = cookieParser.parse(req.headers.cookie)
            try {
                // 解析后的parsed还是一个对象,对象内的键值对中的值是字符串需要再解析成对象
                user = JSON.parse(parsed.user)
            } catch (error) {}
        }
        // 提交 mutation 修改 state 状态
        commit("setUser", user)
    },
}
