# webpack_public_tpl
```
// 初始化
npm i
```
```
// 运行命令
npm run dev
```
```
// 打包命令
npm run none
npm run build
```
<br>

### 另外里面使用了 gulp 生成文件
根据 router/routers.js 里配置路径来生成 <br>
router/initFiles 用来生成的模板文件 <br>
```
// 全局安装 gulp
npm i -g gulp
// 生成命令
gulp run2
```
<br>

### 使用了 nodemon 监听配置文件
router/routers.js 发生改变时，重新执行命令
```
// 全局安装 nodemon
npm i -g nodemon
// 执行
npm run nodemon
```