# Notionクローンアプリケーション

## 使用技術

<img src="https://img.shields.io/badge/-React-61DAFB.svg?logo=react&style=plastic"> <img src="https://img.shields.io/badge/-Redux-764ABC.svg?logo=redux&style=plastic"> <img src="https://img.shields.io/badge/-Typescript-007ACC.svg?logo=typescript&style=plastic"> <img src="https://img.shields.io/badge/-Node.js-339933.svg?logo=node.js&style=plastic"> <img src="https://img.shields.io/badge/-Nodemon-76D04B.svg?logo=nodemon&style=plastic"> <img src="https://img.shields.io/badge/-Prettier-F7B93E.svg?logo=prettier&style=plastic"> <img src="https://img.shields.io/badge/-Axios-5a2ae4.svg?logo=Axios&style=plastic"> <img src="https://img.shields.io/badge/-Express-010409.svg?logo=Express&style=plastic"> <img src="https://img.shields.io/badge/-Day.js-ff5e4c.svg?logo=Day.js&style=plastic"> <img src="https://img.shields.io/badge/-MONGOOSE-880001.svg?logo=MONGOOSE&style=plastic"> <img src="https://img.shields.io/badge/-MUI-007fff.svg?logo=MUI&style=plastic">


## 概要
aaaaaaaa
学習サンプルとして題材にされていたNotionクローンアプリケーションに、Typescriptを加えました。  
また、一部オリジナルから仕様を変更しユーザビリティの向上を行っています。  

#### オリジナルからの変更点

- TypeScript 導入
- メモのタイトル、アイコンを更新したら、サイドバーのタイトル、アイコンも連動して変更
- メモのタイトル、本文が変更された際のUPDATE処理に、サーバ負荷を下げるため遅延処理を実施
- メモのアイコンを変更する絵文字ピッカーを閉じる処理を、画面上どこでも閉じられるよう変更

> **Note**  
> MERNの学習を主目的にしているため、厳密なフォームバリデーションやサニタイズなどは実施しておりません。

<img width="1010" alt="screen_login" src="https://github.com/horiyasu17/clone-notion/assets/7429161/ad302968-0ea8-4ccf-b50e-e26df1c9b760">

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
