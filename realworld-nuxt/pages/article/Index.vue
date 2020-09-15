<template>
    <div class="article-page">
        <div class="banner">
            <div class="container">
                <h1>{{article.title}}</h1>
                <article-meta :article="article"></article-meta>
            </div>
        </div>

        <div class="container page">
            <div class="row article-content">
                <div class="col-md-12" v-html="article.body"></div>
            </div>
            <hr />

            <div class="article-actions">
                <article-meta :article="article"></article-meta>
            </div>

            <div class="row">
                <div class="col-xs-12 col-md-8 offset-md-2">
                   <article-comments :article="article"></article-comments>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getArticle } from "@/api/article";
import MarkdownIt from "markdown-it";
import ArticleMeta from "./components/article-meta";
import ArticleComments from "./components/article-comments"
export default {
    name: "AtriclePage",
    // 需要SEO或首屏渲染速度时
    async asyncData({ params }) {
        const { data } = await getArticle(params.slug);
        const { article } = data;
        const md = new MarkdownIt();
        article.body = md.render(article.body);
        return {
            article,
        };
    },
    components: {
        ArticleMeta,
        ArticleComments
    },
    // 设置头部信息,页面的title和meta 
    head() {
        return {
            title: `${this.article.title} - RealWorld`,
            meta: [
                {
                    hid: 'description', name: 'description', content: `${this.article.description}`
                }
            ]
        }
    }
};
</script>

<style>
</style>