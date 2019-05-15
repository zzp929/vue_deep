// 对应的调用方法是  this.$store.commit()

export default {
    updateCount(state, num) {
        console.log(num);
        state.count = num
    }
}