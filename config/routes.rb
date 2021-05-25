Rails.application.routes.draw do
  resources :users, only: %i[create index]
  resources :polls, except: %i[new edit], param: :slug
  resource :sessions, only: %i[create destroy] 
  resources :responses, only: :create
  root "home#index"
  get '*path', to: 'home#index', via: :all 
end
