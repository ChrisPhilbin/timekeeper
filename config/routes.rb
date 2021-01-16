Rails.application.routes.draw do

  devise_for :users
  authenticated :user do
    root 'pages#my_projects', as: :authenticated_root
  end

  root 'pages#home'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :projects, only: [:index, :show, :create, :update, :destroy] do
        resources :tasks, only: [:index, :show, :create, :update, :destroy]
      end
    end
  end
end
