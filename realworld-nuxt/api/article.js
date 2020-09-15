import { request } from "@/plugins/request"
/**
 * 文章列表
 * @param {Object} params
 */
export function getArticles(params) {
    return request.get("/api/articles", { params })
}
/**
 * 用户收藏文章
 * @param {Object} params
 */
export function getYourFeedArticles(params) {
    return request.get("/api/articles/feed", {
        params,
    })
}

/**
 * 添加点赞
 * @param {String} slug 文章标识
 */
export function addFavorite(slug) {
    return request({
        method: "POST",
        url: `/api/articles/${slug}/favorite`,
    })
}

/**
 * 取消点赞
 * @param {String} slug 文章标识
 */
export function deleteFavorite(slug) {
    return request({
        method: "DELETE",
        url: `/api/articles/${slug}/favorite`,
    })
}

/**
 * 获得文章详情
 * @param {String} slug 文章标识
 */
export function getArticle(slug) {
    return request({
        method: "GET",
        url: `/api/articles/${slug}`,
    })
}

/**
 * 获取文章评论
 * @param {String} slug 文章标识
 */
export function getComments(slug) {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`
    })
}