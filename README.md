# Monorepo Micro Apps

基于 pnpm + monorepo 的微前端项目管理方案。

Micro front end project management scheme based on pnpm monorepo.

## Technology stack

base: ![pnpm](https://badgen.net/badge/pnpm/8.15) ![node](https://badgen.net/badge/node/18+) ![micro-app](https://badgen.net/badge/micro-app/1.0.0)

library: ![Vue](https://badgen.net/badge/vue/3.x) ![React](https://badgen.net/badge/react/18.x)

## Intro

```
./
|- applications
|- packages
|   |- shared
|       |- src
|       |- test
|   |- shared-vue
|   |- shared-react
|- .eslint.config.mjs
|- LICENCE
|- package.json
|- README.md
|- ts-config.json
```

`package/shared` has published at NPM, you can use `npm add @miyue-mma/shared` to install it.
