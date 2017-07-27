Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, except: [:index] do
    resources :contacts, only: [:index, :create, :destroy]
    put 'fcm_token', to: 'users#update_fcm_token'
  end
  resources :chats
  get 'token', to: 'authentication#get_token'

end
