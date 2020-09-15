<template>
    <div class="editor-page">
        <div div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <form>
                        <fieldset>
                            <fieldset class="form-group">
                                <input type="text" class="form-control form-control-lg" placeholder="Article Title" />
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" class="form-control" placeholder="What's this article about?" />
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" class="form-control" placeholder="Enter tags" />
                                <div class="tag-list"></div>
                            </fieldset>
                            <button class="btn btn-lg pull-xs-right btn-primary" type="button">Publish Article</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // 路由中间件对页面路由的拦截处理  nuxt的特性
    middleware: "notauthenticated",
    name: "Editor",
};
</script>

<style>
</style>