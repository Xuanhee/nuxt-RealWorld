<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">{{ isLogin? 'Sing in' : 'Sign up'}}</h1>
                    <p class="text-xs-center">
                        <nuxt-link to="/register" v-if="isLogin">Need an account?</nuxt-link>
                        <nuxt-link to="/login" v-else>Have an account?</nuxt-link>
                    </p>

                    <ul class="error-messages">
                        <template v-for="(messages,keyName) in errors">
                            <li v-for="(message, index) in messages" :key="index">{{keyName}} {{message}}</li>
                        </template>
                    </ul>

                    <form @submit.prevent="onSubmit">
                        <fieldset class="form-group" v-if="!isLogin">
                            <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username" required />
                        </fieldset>
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="user.email" required />
                        </fieldset>
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" minlength="8" required />
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">{{ isLogin? 'Sing in' : 'Sign up'}}</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { login, register } from "@/api/user";
// 仅在客户端加载js-cookie包  process.client是nuxt特有的判断是否客户端
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
    // 路由中间件对页面路由的拦截处理  nuxt的特性
    middleware: "authenticated",
    name: "LoginPage",
    data() {
        return {
            user: {
                username: "",
                email: "529177573@qq.com",
                password: "fyfy1234",
            },
            errors: {},
        };
    },
    computed: {
        isLogin() {
            return this.$route.name === "login";
        },
    },
    methods: {
        // 提交表单事件
        async onSubmit() {
            try {
                const { data } = this.isLogin
                    ? await login({ user: this.user })
                    : await register({ user: this.user });
                // 保存登录状态存储到vuex中
                this.$store.commit("setUser", data.user);
                // 数据持久化,nuxt中不能放到本地存储里,要让客户端和服务端都拿到放到cookie里
                Cookie.set("user", data.user);
                // 跳转到首页
                this.$router.push("/");
            } catch (err) {
                this.errors = err.response.data.errors;
            }
        },
    },
};
</script>

<style>
</style>