# Notionクローンアプリケーション

## 使用技術

<img src="https://img.shields.io/badge/-React-61DAFB.svg?logo=react&style=plastic">
<img src="https://img.shields.io/badge/-Redux-764ABC.svg?logo=redux&style=plastic">
<img src="https://img.shields.io/badge/-Typescript-007ACC.svg?logo=typescript&style=plastic">
<img src="https://img.shields.io/badge/-Node.js-339933.svg?logo=node.js&style=plastic">
<img src="https://img.shields.io/badge/-Nodemon-76D04B.svg?logo=nodemon&style=plastic">
<img src="https://img.shields.io/badge/-Prettier-F7B93E.svg?logo=prettier&style=plastic">
<img src="https://img.shields.io/badge/-Axios-5a2ae4.svg?logo=Axios&style=plastic">
<img src="https://img.shields.io/badge/-Express-010409.svg?logo=Express&style=plastic">
<img src="https://img.shields.io/badge/-Day.js-ff5e4c.svg?logo=Day.js&style=plastic">
<img src="https://img.shields.io/badge/-MONGOOSE-880001.svg?logo=MONGOOSE&style=plastic">
<img src="https://img.shields.io/badge/-MUI-007fff.svg?logo=MUI&style=plastic">

## 概要

学習サンプルとして題材されていたNotionクローンアプリケーションに、独自にTypescriptを加えました。  
また、一部オリジナルから仕様を変更しユーザビリティの向上しています。  

## ディレクトリ構成

```shell
$ tree -d -I 'node_modules|dist'
.
├── client
│   ├── public
│   └── src
│       ├── api
│       ├── assets
│       │   ├── css
│       │   └── images
│       ├── components
│       │   ├── common
│       │   └── layouts
│       ├── hooks
│       ├── pages
│       ├── redux
│       │   └── features
│       ├── types
│       └── util
└── server
    └── src
        └── v1
            ├── controllers
            ├── handlers
            ├── models
            └── routes
```

## セットアップ

1. ルートディレクトリーにて、ライブラリーをインストール

```shell
npm install
# or
yarn install
```

2. サーバサイドのライブラリーをインストール

```shell
cd ./server/nn

npm install
# or
yarn install
```

3. クライアントサイドのライブラリーをインストール

```shell
cd ./client/
npm install
# or
yarn install
```