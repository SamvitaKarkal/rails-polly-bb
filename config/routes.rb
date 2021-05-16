Rails.application.routes.draw do
  resources :users, only: %i[index create]
  resources :polls, except: %i[new edit]
  resource :sessions, only: :create
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "home#index"
  get '*path', to: 'home#index', via: :all 
end
