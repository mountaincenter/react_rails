# react_rails
### 開発環境
- OS・Docker
  - macOS Big Sur version 11.6.5
  - Docker version 20.10.17
  - docker-compose version 1.29.2
- バックエンド
  - ruby version 3.1.2p20
  - ruby on rails version 6.1.7
  - mysql version 8.0.30
- フロントエンド
  - node version 16.17.0
  - yarn version 1.22.19
  - typescript version 4.4.2
  - react version 18.2.0

### Docker,docker-composeによる環境構築(ローカル環境)
```
# docker-compose.yml ファイルの作成
touch docker-compose.yml

# バックエンドDocker環境構築
mkdir backend
touch backend/{Dockerfile,Gemfile,Gemfile.lock,entrypoint.sh}

# フロントエンドDocker環境構築
mkdir frontend
touch frontend/Dockerfile

```
### バックエンド
- railsの手順
- gemfile
  ```
  # cors
  gem 'rack-cors'
  # 認証
  gem 'devise'
  gem 'devise_token_auth'
  # 画像
  gem 'carrierwave'
  # ダミーデータ
  gem 'faker'
  # シリアライザー
  gem 'active_model_serializers'
  ```
- devise,devise_token_authのインストール(Userモデルの作成)
  ```
  rails g devise:install
  rails g devise_token_auth:install User auth
  rails g db:migrate
  ```
- curlコマンドにてアカウント作成及びサインインができるか確認(コンテナ内)
  ```
  # アカウント作成(ユーザー名:test email:test@example パスワード:password)
  curl -X POST -v http://localhost:3000/api/v1/auth \
  -d "[name]=test&[email]=test@example.com&[password]=password&[password_confirmation]=password"

  # サインイン(email:test@example.com パスワード:password)
  # -iオプションはヘッダー情報の取得
  curl http://localhost:3000/api/v1/auth/sign_in \
  -d "[email]=test@example.com&[password]=password" -i
  ```


### フロントエンド
- react
  ```
  docker-compose run --rm front bash
  # current directryに新規作成
  yarn create react-app . --template typescript
  ```
- libraly
  ```
  # axios(rails側で作成したapiを呼び出し)
  yarn add axios axios-case-converter
  yarn add -D @types-axios

  # js-cookie(認証Cookieを操作するためのライブラリ)
  yarn add js-cookie
  yarn add -D @types/js-cookie

  # mui(UIを整えるmaterialUIのライブラリ)
  yarn add @mui/icons-material @mui/material @emotion/react @emotion/styled

  # react-router-dom(ルーティング設定用のライブラリ)
  yarn add react-router-dom
  yarn add -D @types/react-route-dom

  # date-fns(日付関連を操作するライブラリ)
  yarn add date-fns
  ```