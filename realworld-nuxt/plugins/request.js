import axios from "axios"

// 创建axios实例 设置基础配置
export const request = axios.create({
    baseURL: "https://conduit.productionready.io",
})

// 通过插件机制获取到上下文对象(query, params, req,res app, store...)
// 插件导出函数必须是 default 成员
export default ({ store }) => {
    // 请求拦截
    request.interceptors.request.use(
        (config) => {
            // 解构出插件中的store对象，获取store中定义的user属性
            const { user } = store.state
            if (user && user.token) {
                config.headers.Authorization = `Token ${user.token}`
            }
            return config
        },
        (err) => {
            return Promise.reject(err)
        }
    )
}
