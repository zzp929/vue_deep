// 对应的调用方法是  this.$store.dispatch()
export default {
    updateCountAsync(store, data) {
        console.log(data+111);
        setTimeout(() => {
            store.commit('updateCount', data.num)
        },5000)
    }
}