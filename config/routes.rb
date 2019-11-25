Rails.application.routes.draw do
  devise_for :users
  # devise_for :users,
  #   controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'transfert', to: 'pages#transfert'
  get 'usecases', to: 'pages#usecases'
  get 'contact', to: "pages#contact"
  get 'tracking', to: "pages#home_tracking"
  get 'device', to: "pages#transfert_tracking"
  get 'how', to: "pages#how"
end
