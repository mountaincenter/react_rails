Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :test, only: %i[index]
      resources :users, only: %i[index show update] do
        member do
          get :following, :followers
        end
      end
      resources :messages, only: %i[create]
      resources :chat_rooms, only: %i[create index show]
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }
      namespace :auth do
        resources :sessions, only: %i[index]
      end
      resources :posts, only: %i[index create destroy show]
      resources :relationships, only: %i[create destroy]
      resources :likes, only: %i[create destroy]
    end
  end
end
