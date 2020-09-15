import { request } from "@/plugins/request"

// 获取所有标签
export function getTags() {
    return request.get("/api/tags")
}
