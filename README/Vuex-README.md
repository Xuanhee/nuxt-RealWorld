# Vuex

## 什么是Vuex
- Vuex 是专门为Vue.js设计的状态管理库
- Vuex 采用集中式的方式存储需要共享的状态
- Vuex 的作用是进行状态管理，解决复杂组件通信，数据共享
- Vuex 集成到了 devtools中，提供了time-travel时光旅行历史回滚功能

## 什么情况下使用Vuex
- 非必要的情况不要使用 Vuex
- 大型的单页应用程序
  - 多个视图依赖于同一状态
  - 来自不同视图的行为需要变更同一状态


## Vuex 核心概念：
- Store：
  - 每一个应用仅有一个Store
  - Store是一个容器包含着应用的大部分状态
- State：
  - 单一状态树，也是唯一的
  - 状态是响应式的
- Getter：
  - 计算属性，对计算结果进行缓存
- Mutation：
  - 状态的变化必须通过提交mutation来完成
- Action：
  - 可以进行异步操作，内部改变状态的时候需要提交mutation
- Module：
  - 将Store分割成模块

![Vuex核心](./image/Vuex核心.png)

## 实现一个简单的Vuex

### 1.作为一个插件首先要定义install方法
- 这里和之前实现简单的router不同
  - 在使用Vuex的使用是直接使用的Vue.use(Vuex)
  - 而实现的时候是使用的new Vuex.Store() 
  - 所以需要默认导出一个对象,对象内包含Store,和install

```JavaScript
// 缓存Vue的实例到全局中
let _Vue
function install(vue) {
    // 只在实例中挂载一次
    if(Store.installed) return
    Store.installed = true
    _Vue = vue
    // 把创建vue实例时候传入的store对象注入的vue实例上
    // 混入，这里混入所有的vue实例都会有
    _Vue.mixin({
        beforeCreate(){
            if(this.$options.store) {
            // 原型上挂在操作只需要执行一次，如果是组件不执行，如果是vue实例才执行
            _Vue.prototype.$store = this.$options.store
            }     
        }
    })
  })
}
```

### 2.定义Store类中的constructor

- 根据传入的参数来初始化Store
- 然后初始化Store内的属性
  - state是响应式的
  - 把getters内的方法通过Object.defineProperty转换成getters对象中的get访问器

```javascript
class Store {
    constructor(options) {
        // 解构出来传递的选项， 默认值是空对像
        const {
            state = {},
            getters = {}
            mutations = {},
            actions = {}
        } = options
        this.state = _Vue.observable(state)
        // getters对象中的一个个方法都需要接受state参数,且都具有返回值(返回state简单处理的结果)
        this.getters = Object.create(null)
        // 遍历getters对象内所有的方法,key是方法名
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get: () => getters[key](this.state)
            })
        })
        this._mutations = mutations
        this._actions = actions
    }
}
```

### 3.定义commit函数

- 作用是触发mutations内对应的方法
- 接收两个参数
  - type: 方法名
  - payload: 用户传入的参数
- mutations内的方法接收两个参数
  - state: 状态对象
  - payload: 用户传入的参数
```javascript
commit(type, payload) {
    this._mutations[type](this.state, payload)
}
```

### 4.定义dispatch函数

- 作用是触发actions内定义的方法
- 接收两个参数
  - type: 方法名
  - payload: 传入的参数
- 触发actions内部的方法时需要接收两个参数
  - context: 上下文,我这里是简易版所以传入store实例
  - payload: 用户传入的参数
```JavaScript
dispatch(type, payload) {
    this._actions[type](this, payload)
}
```

### 整合到一起后
```javascript
let _Vue
function install(vue) {
    // 只在实例中挂载一次
    if(Store.installed) return
    Store.installed = true
    _Vue = vue
    // 把创建vue实例时候传入的store对象注入的vue实例上
    // 混入，这里混入所有的vue实例都会有
    _Vue.mixin({
        beforeCreate(){
            if(this.$options.store) {
            // 原型上挂在操作只需要执行一次，如果是组件不执行，如果是vue实例才执行
            _Vue.prototype.$store = this.$options.store
            }     
        }
    })
  })
}
class Store {
    constructor(options) {
        // 解构出来传递的选项， 默认值是空对像
        const {
            state = {},
            getters = {}
            mutations = {},
            actions = {}
        } = options
        this.state = _Vue.observable(state)
        // getters对象中的一个个方法都需要接受state参数,且都具有返回值(返回state简单处理的结果)
        this.getters = Object.create(null)
        // 遍历getters对象内所有的方法,key是方法名
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get: () => getters[key](this.state)
            })
        })
        this._mutations = mutations
        this._actions = actions
    } 
    commit(type, payload) {
        this._mutations[type](this.state, payload)
    }

        dispatch(type, payload) {
    this._actions[type](this, payload)
    }
}
// 默认导出一个对象,对象内包含Store类和install方法
export default {
    Store,
    install
}
```