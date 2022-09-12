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