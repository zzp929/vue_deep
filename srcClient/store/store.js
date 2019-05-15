import Vuex from 'vuex'
import defaultState from './state/state' //数据仓库
import getters from './getters/getters' // 获取数据
import mutations from './mutations/mutations' // 修改数据
import actions from './actions/actions' // 获取数据---和mutations类似，以后异步操作尽量都写在actions中
import createLogger from 'vuex/dist/logger'

const isDev = process.env.NODE_ENV === 'development'
export default () => {
    const store = new Vuex.Store({
        strict: isDev,//开发配置，可以限制修改vuex中state的方式，规范代码
        state: defaultState,
        mutations,
        actions,
        getters,
        modules: {
            a: {
                namespaced: true,//当前a模块的命名空间不与全局的混淆
                state: {
                    text: 'aaa'
                },
                mutations: {
                    updateText(state, text) {
                        state.text = text
                    }
                },
                getters: {
                    textPlus(state, getters, rootState) {
                        return state.text + rootState.b.text
                    }
                },
                actions: {
                    add({state, commit, rootState}) {
                        commit('updateCount', 6789, {root: true})
                    }

                }
            },
            b: {
                state: {
                    text: 2
                }
            }
        },
        plugins: isDev ? [createLogger()] : []// 开发环境下显示vuex的状态修改
    })


    //vuex模块热更新
    if (module.hot) {
        module.hot.accept([
            './state/state',
            './mutations/mutations',
            './actions/actions',
            './getters/getters'
        ], () => {
            const newState = require('./state/state').default
            const newMutations = require('./mutations/mutations').default
            const newActions = require('./actions/actions').default
            const newGetters = require('./getters/getters').default

            store.hotUpdate({
                state: newState,
                mutations: newMutations,
                getters: newGetters,
                actions: newActions
            })
        })
    }

    return store
}