Rails.application.routes.draw do
  root to: 'pages#home'

  get 'requests/index', to: "requests#index"
  get 'requests/new', to: "requests#new"
  post 'requests', to: "requests#create"
  # devise_for :users
  # devise_for :users,
  #   controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'terms_and_conditions', to: "pages#terms_and_conditions"
  get 'transfert', to: 'pages#transfert'
  get 'usecases', to: 'pages#usecases'
  get 'contact', to: "pages#contact"
  get 'tracking', to: "pages#home_tracking"
  get 'device', to: "pages#transfert_tracking"
  get 'how', to: "pages#how"
  get 'toto', to: "pages#toto"


  get    "users/new",      to: "users#new"
  post   "users",          to: "users#create"


  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :users, only: [:create]
    end
  end

end
