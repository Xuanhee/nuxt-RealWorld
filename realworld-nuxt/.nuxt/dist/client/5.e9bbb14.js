(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{183:function(t,e,r){"use strict";r.d(e,"d",(function(){return c})),r.d(e,"f",(function(){return o})),r.d(e,"a",(function(){return l})),r.d(e,"b",(function(){return v})),r.d(e,"c",(function(){return f})),r.d(e,"e",(function(){return d}));var n=r(61);function c(t){return n.b.get("/api/articles",{params:t})}function o(t){return n.b.get("/api/articles/feed",{params:t})}function l(t){return Object(n.b)({method:"POST",url:"/api/articles/".concat(t,"/favorite")})}function v(t){return Object(n.b)({method:"DELETE",url:"/api/articles/".concat(t,"/favorite")})}function f(t){return Object(n.b)({method:"GET",url:"/api/articles/".concat(t)})}function d(t){return Object(n.b)({method:"GET",url:"/api/articles/".concat(t,"/comments")})}},251:function(t,e,r){"use strict";r.r(e);r(77),r(30),r(60);var n=r(56),c=(r(31),r(13),r(43),r(41)),o=(r(29),r(3)),l=r(183),v=r(61);var f=r(40);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function m(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var _={name:"HomePage",asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var r,n,o,f,d,m,_,h,C,O,y,k;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.query,n=parseInt(r.page||1),o=20,f=r.tag,d=r.tab||"global_feed",m="your_feed"===d?l.f:l.d,e.next=8,Promise.all([m({offset:(n-1)*o,limit:o,tag:f}),v.b.get("/api/tags")]);case 8:return _=e.sent,h=Object(c.a)(_,2),C=h[0].data,O=C.articles,y=C.articlesCount,k=h[1].data.tags,O.forEach((function(t){t.disabled=!1})),e.abrupt("return",{articles:O,articlesCount:y,limit:o,page:n,tags:k,tag:f,tab:d});case 16:case"end":return e.stop()}}),e)})))()},watchQuery:["page","tag","tab"],computed:m(m({},Object(f.b)(["user"])),{},{totalPage:function(){return Math.ceil(this.articlesCount/this.limit)}}),methods:{onFavorite:function(article){return Object(o.a)(regeneratorRuntime.mark((function t(){var e,r,n,c,o,v,f,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(article.disabled=!0,!article.favorited){t.next=12;break}return t.next=4,Object(l.b)(article.slug);case 4:e=t.sent,r=e.data.article,n=r.favorited,c=r.favoritesCount,article.favoritesCount=c,article.favorited=n,t.next=20;break;case 12:return t.next=14,Object(l.a)(article.slug);case 14:o=t.sent,v=o.data.article,f=v.favorited,d=v.favoritesCount,article.favoritesCount=d,article.favorited=f;case 20:article.disabled=!1;case 21:case"end":return t.stop()}}),t)})))()}}},h=r(20),component=Object(h.a)(_,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"home-page"},[t._m(0),t._v(" "),r("div",{staticClass:"container page"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-9"},[r("div",{staticClass:"feed-toggle"},[r("ul",{staticClass:"nav nav-pills outline-active"},[t.user?r("li",{staticClass:"nav-item"},[r("nuxt-link",{staticClass:"nav-link",class:{active:"your_feed"===t.tab},attrs:{to:{name:"home",query:{tab:"your_feed"}}}},[t._v("Your Feed")])],1):t._e(),t._v(" "),r("li",{staticClass:"nav-item"},[r("nuxt-link",{staticClass:"nav-link",class:{active:"global_feed"===t.tab},attrs:{to:{name:"home"}}},[t._v("Global Feed")])],1),t._v(" "),t.tag?r("li",{staticClass:"nav-item"},[r("nuxt-link",{staticClass:"nav-link",class:{active:"tag"===t.tab},attrs:{to:{name:"home",query:{tag:t.tag,tab:"tag"}}}},[t._v("#"+t._s(t.tag))])],1):t._e()])]),t._v(" "),t._l(t.articles,(function(article){return r("div",{key:article.slug,staticClass:"article-preview"},[r("div",{staticClass:"article-meta"},[r("nuxt-link",{attrs:{to:{name:"profile",params:{username:article.author.username}}}},[r("img",{attrs:{src:article.author.image}})]),t._v(" "),r("div",{staticClass:"info"},[r("nuxt-link",{staticClass:"author",attrs:{to:{name:"profile",params:{username:article.author.username}}}},[t._v(t._s(article.author.username))]),t._v(" "),r("span",{staticClass:"date"},[t._v(t._s(t._f("date")(article.createdAt,"MMM DD, YYYY")))])],1),t._v(" "),r("button",{staticClass:"btn btn-outline-primary btn-sm pull-xs-right",class:{active:article.favorited},attrs:{disabled:article.disabled},on:{click:function(e){return t.onFavorite(article)}}},[r("i",{staticClass:"ion-heart"}),t._v("\n                            "+t._s(article.favoritesCount)+"\n                        ")])],1),t._v(" "),r("nuxt-link",{staticClass:"preview-link",attrs:{to:{name:"article",params:{slug:article.slug}}}},[r("h1",[t._v(t._s(article.title))]),t._v(" "),r("p",[t._v(t._s(article.description))]),t._v(" "),r("span",[t._v("Read more...")])])],1)}))],2),t._v(" "),r("nav",[r("ul",{staticClass:"pagination"},t._l(t.totalPage,(function(e){return r("li",{key:e,staticClass:"page-item",class:{active:t.page===e}},[r("nuxt-link",{staticClass:"page-link",attrs:{to:{name:"home",query:{page:e,tag:t.tag,tab:t.tab}}}},[t._v(t._s(e))])],1)})),0)]),t._v(" "),r("div",{staticClass:"col-md-5"},[r("div",{staticClass:"sidebar"},[r("p",[t._v("Popular Tags")]),t._v(" "),r("div",{staticClass:"tag-list"},t._l(t.tags,(function(e){return r("nuxt-link",{key:e,staticClass:"tag-pill tag-default",attrs:{to:{name:"home",query:{tag:e,tab:"tag"}}}},[t._v(t._s(e))])})),1)])])])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"banner"},[e("div",{staticClass:"container"},[e("h1",{staticClass:"logo-font"},[this._v("conduit")]),this._v(" "),e("p",[this._v("A place to share your knowledge.")])])])}],!1,null,null,null);e.default=component.exports}}]);