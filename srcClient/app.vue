<template>
    <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <p>{{count}}</p>
        <p>{{fullName}}</p>
        <router-link to="/app">app</router-link>
        <router-link :to="{name:'login'}">login</router-link>
        <!--<Todo></Todo>-->
        <transition name="fade">
            <router-view></router-view>
        </transition>
        <Footer></Footer>
        <!--<router-view name="a"></router-view>-->
    </div>
</template>

<script>
    import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
    import Header from './layout/header'
    import Footer from './layout/footer'
    // import Todo from './views/todo/todo.vue'

    export default {
        data() {
            return {}
        },
        mounted() {
            console.log(this.$store);
            let i = 1
            this.updateCountAsync({
                num: 5,
                time: 2000
            })
            // this.$store.dispatch('updateCountAsync', {
            //     num: 5,
            //     time: 2000
            // })
            // setInterval(() => {
            //     // this.$store.state.count = 2
            //     // 调用mutations方法，通过commit,不可通过上面代码修改
            //     this.$store.commit('updateCount', i++)
            this.updateCount('updateCount', i++)
            // }, 1000)
        },
        computed: {
            //下面语法还未定稿，需要安装babel-preset-stage-1  插件
            // ...mapState(['count']),//同名情况直接一个数组，不同名情况用一个{ }
            ...mapState({
                // count: 'count',//同下
                count: (state) => state.count
            }),
            // count() {
            //     return this.$store.state.count
            // },
            ...mapGetters(['fullName'])
            // fullName() {
            //     return this.$store.getters.fullName
            // }
        },
        methods: {
            ...mapActions(['updateCountAsync']),
            ...mapMutations(['updateCount'])
        },
        components: {
            Header,
            Footer,
            // Todo
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    #app
        position absolute
        left 0
        right 0
        top 0
        bottom 0

    #cover
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        background-color #999
        opacity .9
        z-index -1
</style>