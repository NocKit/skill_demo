import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isCollapse: false,
        userInfo: {
            name: 'user1',
            avatar: 'data:image/jpg;base64,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',
            roles: []
        },
        breadcrumbs: [],
        activeIndex: 1,
    },
    getters: {},
    mutations: {
        setCollapse(state, isCollapse) {
            state.isCollapse = isCollapse
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        setBreadcrumb(state, breadcrumbs) {
            state.breadcrumbs = breadcrumbs
        },
        setActiveIndex(state, activeIndex) {
            state.activeIndex = activeIndex
        }
    },
    actions: {
        login({commit}) {
            return new Promise((resolve) => {
                let userInfo = {
                    name: 'user1',
                    avatar: 'data:image/jpg;base64,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',
                    roles: []
                }
                commit('setUserInfo', userInfo)
                sessionStorage.setItem('user', JSON.stringify(userInfo))
                resolve()
            })
        },
        logout({ commit }) {
            return new Promise(resolve => {
                commit('setUserInfo', {})
                sessionStorage.removeItem('user')
                resolve()
            })
        },
    },
    modules: {}
})
