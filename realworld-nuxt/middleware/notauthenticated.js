/**
 * 验证是否登录的中间件
 */
export default ({ store, redirect }) => {
    // 如果用户没有登录,跳转去登录页面
    if (!store.state.user) {
        redirect("/login")
    }
}
