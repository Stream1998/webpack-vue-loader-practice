# webpack-vue-loader-practice

使用 `webpack` 打包编译 `.vue` 文件，简单实现 `vue loader` 和 `vue` 模块。
`vue loader` 实现了 `.vue` 文件的编译加载成 `.js` 文件。

## 依赖

```
npm install webpack webpack-cli webpack-dev-server html-webpack-plugin -D
```

## 模块

### vue loader 

通过 `webpack.config.js` 中的 `module` 配置，使用 `vue-loader` 将 `.vue` 文件进行加载。

`vue-loader` 的参数为 `source`, 即 `.vue` 文件的源码文本。

使用 正则 匹配 `<template>`、 `<script>`, 并把它们拼接在一起，返回一个对象。

### vue

首先将 `vue-loader` 处理好的结果解构，分别是 `data`, `methods` 和 `template`。

#### data的处理

`data` 是一个函数，执行并赋值给 `vm.$data`。
使用 `Object.defineProperty` 数据劫持 `vm.$data`，进而实现节点的[动态更新](#动态更新)。

#### template 的处理

将 `template` 赋值临时节点的 `innerHTML`, 取出第一个元素节点, 并把它赋值给 `vm.$node`。
将元素节点的 `textContent` 进行处理，解析 `{{}}` 中的表达式，找到 `vm.$data` 中的变量, 将元素节点、变量与表达式一并存到 `Map` 中。
将元素节点的 `@click` 属性进行处理，将元素节点、方法名和参数一并存到 `Map` 中。

#### methods的处理

从 `Map` 取出元素节点，方法名，由 `vm` 代理每一个方法，为元素节点绑定 `click` 事件。

### 动态更新

从 `Map` 取出元素节点，变量和表达式，使用 `new Function` 和 `with` 执行表达式并把结果赋值给元素节点的 `textContent`。
