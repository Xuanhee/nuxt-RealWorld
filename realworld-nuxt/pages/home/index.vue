<template>
    <div class="home-page">
        <div class="banner">
            <div class="container">
                <h1 class="logo-font">conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>

        <div class="container page">
            <div class="row">
                <div class="col-md-9">
                    <div class="feed-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item" v-if="user">
                                <nuxt-link
                                    class="nav-link"
                                    :class="{active: tab === 'your_feed'}"
                                    :to="{name:'home', query: {
                                    tab: 'your_feed'
                                }}"
                                >Your Feed</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link class="nav-link" :class="{active: tab === 'global_feed'}" :to="{name: 'home'}">Global Feed</nuxt-link>
                            </li>
                            <li class="nav-item" v-if="tag">
                                <nuxt-link
                                    class="nav-link"
                                    :class="{active: tab === 'tag'}"
                                    :to="{name: 'home', query: {
                                    tag,
                                    tab: 'tag'
                                }}"
                                >#{{ tag }}</nuxt-link>
                            </li>
                        </ul>
                    </div>

                    <div class="article-preview" v-for="article in articles" :key="article.slug">
                        <div class="article-meta">
                            <nuxt-link
                                :to="{
                                name: 'profile',
                                params: {
                                    username: article.author.username
                                }
                            }"
                            >
                                <img :src="article.author.image" />
                            </nuxt-link>
                            <div class="info">
                                <nuxt-link
                                    :to="{
                                name: 'profile',
                                params: {
                                    username: article.author.username
                                }
                            }"
                                    class="author"
                                >{{ article.author.username }}</nuxt-link>
                                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
                            </div>
                            <button
                                class="btn btn-outline-primary btn-sm pull-xs-right"
                                :class="{ active: article.favorited }"
                                @click="onFavorite(article)"
                                :disabled="article.disabled"
                            >
                                <i class="ion-heart"></i>
                                {{ article.favoritesCount }}
                            </button>
                        </div>
                        <nuxt-link class="preview-link" :to="{ name: 'article', params: { slug: article.slug }}">
                            <h1>{{article.title}}</h1>
                            <p>{{article.description}}</p>
                            <span>Read more...</span>
                        </nuxt-link>
                    </div>
                </div>

                <!-- 分页列表 -->
                <nav>
                    <ul class="pagination">
                        <li class="page-item" :class="{ active: page === item }" v-for="item in totalPage" :key="item">
                            <nuxt-link class="page-link" :to="{name: 'home', query: { page: item, tag, tab }}">{{ item }}</nuxt-link>
                        </li>
                    </ul>
                </nav>
                <!-- /分页列表 -->

                <div class="col-md-5">
                    <div class="sidebar">
                        <p>Popular Tags</p>
                        <div class="tag-list">
                            <nuxt-link class="tag-pill tag-default" v-for="item in tags" :key="item" :to="{name: 'home', query: { tag: item,tab:'tag' }}">{{ item }}</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    getArticles,
    getYourFeedArticles,
    addFavorite,
    deleteFavorite,
} from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";
export default {
    name: "HomePage",
    async asyncData({ query }) {
        // 当前页
        const page = parseInt(query.page || 1);
        // 每页数量
        const limit = 20;
        // 当前标签
        const tag = query.tag;
        // 当前tab栏, 默认是所有
        const tab = query.tab || "global_feed";
        const loadArticles =
            tab === "your_feed" ? getYourFeedArticles : getArticles;
        // 并行获取文章列表/标签列表 , 多层嵌套解构出data内的参数 文章和文章总数 ,解构出data内的tags
        const [
            {
                data: { articles, articlesCount },
            },
            {
                data: { tags },
            },
        ] = await Promise.all([
            loadArticles({
                offset: (page - 1) * limit,
                limit,
                tag,
            }),
            getTags(),
        ]);
        // 设置按钮禁用状态
        articles.forEach((item) => {
            item.disabled = false;
        });

        return {
            articles,
            articlesCount,
            limit,
            page,
            tags,
            tag,
            tab,
        };
    },
    // 默认情况下query的改变不会调用asyncData方法, 使用watchQuery监听query的变化调用asyncData
    watchQuery: ["page", "tag", "tab"],
    computed: {
        ...mapState(["user"]),
        totalPage() {
            return Math.ceil(this.articlesCount / this.limit);
        },
    },
    methods: {
        async onFavorite(article) {
            article.disabled = true;
            // 已经点赞则取消点赞
            if (article.favorited) {
                // 解构出取消点赞后的文章状态和点赞数
                const {
                    data: {
                        article: { favorited, favoritesCount },
                    },
                } = await deleteFavorite(article.slug);
                article.favoritesCount = favoritesCount;
                article.favorited = favorited;
            } else {
                // 没点赞则点赞
                const {
                    data: {
                        article: { favorited, favoritesCount },
                    },
                } = await addFavorite(article.slug);
                article.favoritesCount = favoritesCount;
                article.favorited = favorited;
            }
            article.disabled = false;
        },
    },
};
</script>

<style>
</style>