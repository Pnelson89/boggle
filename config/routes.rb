Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root "games#show"
  # root to: "games#show", id: '1'
  root 'games#index'

  resources :games, only: [:show, :index]

  resources :dictionary, only: [:index]

#yelp?key=someStuff
end
