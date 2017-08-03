Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root "games#show"
  # root to: "games#show", id: '1'

  resources :games, only: [:show]

  resources :api, only: [:index]
end
