import { request } from "@/plugins/request"
/**
 * 用户登录
 * @param {Object} data
 */
export function login(data) {
    return request.post("/api/users/login", data)
}

/**
 * 用户注册
 * @param {Object} data
 */
export function register(data) {
    return request.post("/api/users", data)
}
