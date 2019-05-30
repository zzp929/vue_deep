import {createApp} from './create-app'

export default context => {
    return new promise((resolve, reject) => {
        const {app, router, store} = createApp();
        router.push(context.url);//在服务端给路由推一条记录
        //onReady一般只有在服务端渲染的时候才会用到
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject(new Error('no component matched'))
            }
            resolve(app)
        })
    })
}