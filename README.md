# idcuicommon

## 定位
业务侧的通用组件库，来源于业务同时主推业务成长。

## 组件列表
- ExportButton

### ExportButton

#### 特点
1. 接口导出、客户端导出。
2. 支持导出格式**xlsx**、**csv**、**txt**。
3. 支持button名字、样式自定义。
4. 后续支持复杂表头的导出。

## 发布流程
1. 更新的信息都正常commit
2. ```npm version patch|minor|major```升级版本号
3. 修改vue.config.js ```is_publish```改为```true```，执行 ```yarn build-bundle```构建内容输出到dist目录中。
4. 执行```git checkout .```，将```vue.config.js```文件恢复，执行```yarn build```，更新pages页面。
5. ```npm publish```，发布项目
5. ```git push github master```，push代码到版本库。