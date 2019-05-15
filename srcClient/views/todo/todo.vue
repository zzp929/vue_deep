<template>
    <section class="real-app">
        <input type="text" class="add-input" autofocus="autofocus" placeholder="接下去要做什么？" @keyup.enter="addTodo">
        <item :todo="todo" v-for="todo in filteredTodos" :key="todo.id" @del="deleteTodo"/>
        <tabs :filter="filter" :todos="todos" @toggle="toggleFilter" @clearAllCompleted="clearAllCompleted"/>
        <router-view></router-view>
    </section>
</template>

<script>
    import Item from './item.vue'
    import Tabs from './tabs.vue'

    let id = 0
    export default {
        // 当此守卫执行前，组件实例还没被创建，所以不能访问 this
        beforeRouteEnter(to, from, next) {
            console.log('组件内 beforeRouteEnter 守卫');
            next(vm => {
                // 通过这种方式可以获取当前组件this，vm相当于this
            })
        },
        // 在当前路由改变，但是该组件被复用时调用（一般是动态路径跳转）可以访问 this
        beforeRouteUpdate(to, from, next) {
            console.log('组件内 beforeRouteUpdate 守卫');
            next()
        },
        // 导航离开该组件的对应路由时调用，可以访问 this
        beforeRouteLeave(to, from, next) {
            console.log('组件内 beforeRouteLeave 守卫');
            console.log(global);
            // global 相当于  window
            if (global.confirm('asdasd')) {
                next()
            }
        },
        props: ['id'],
        data() {
            return {
                todos: [],
                filter: 'all',
            }
        },
        components: {
            Item,
            Tabs,
        },
        computed: {
            filteredTodos() {
                if (this.filter === 'all') {
                    return this.todos
                }
                const completed = this.filter === 'completed'
                return this.todos.filter(todo => completed === todo.completed)
            }
        },
        mounted() {
            // this.$route 相当于 this.$router.currentRoute
            console.log(this.$route);
            console.log(this.id);
        },
        methods: {
            addTodo(e) {
                // trim()去掉前后空格
                this.todos.unshift({
                    id: id++,
                    content: e.target.value.trim(),
                    completed: false
                })
                e.target.value = ''
            },
            deleteTodo(id) {
                this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
            },
            toggleFilter(state) {
                this.filter = state
            },
            clearAllCompleted() {
                this.todos = this.todos.filter(todo => !todo.completed)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .real-app {
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }

    .add-input {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        padding: 6px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 60px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }
</style>


