Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, :chats
  get 'access_token', to: 'authentication#get_access_token'
end
