/**
 * 验证是否登录的中间件
 */
export default ({ store, redirect }) => {
    // 如果已经是登录状态
    if (store.state.user) {
        return redirect("/")
    }
}
