const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const MemoryFs = require('memory-fs')
const fs = require('fs');
//MemoryFs和fs一样，最大的区别是，memoryFs不把文件写到磁盘上，而是写在内存里面
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')
const serverCompiler = webpack(serverConfig)
const mfs = new MemoryFs()
// 指定serverCompiler文件输入到mfs内存中，而不是写在磁盘上
serverCompiler.outputFileSystem = mfs
let bundle
serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach((err => console.log(err)));
    stats.warnings.forEach(warn => console.log(warn))

    const bundlePATH = path.join(
        serverConfig.output.path,
        'vue-ssr-server-bundle.json'   //vue-server-renderer插件生成的json文件
    );

    bundle = mfs.readFileSync(bundlePATH, 'utf-8')
    console.log('new bundle generated');
});

const handleSSR = async (ctx) => {
    if (!bundle) {
        ctx.body = '你等一会，别着急......';
        return
    }

    const clientManifestResp = await axios.get('http://127.0.0.1:8000/vue-ssr-client-manifest.json').data

    // const clientManifest = clientManifestResp.data
    const template = fs.readFileSync(
        path.join(__dirname, '../server.template.ejs'), 'utf-8'
    );

    const renderer = VueServerRenderer.createBundleRenderer(bundle, {
        inject: false,//true的话，会按照VueServerRenderer规则注入一些配置
        clientManifestResp
    })

    await serverRender(ctx, renderer, template)
};

const router = new Router()
router.get('*', handleSSR)

module.exports = router
