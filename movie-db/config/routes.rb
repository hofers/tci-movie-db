Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do 
    namespace :v1 do 
     resources :reviews, only: [:index, :create, :destroy, :update]
    end 
  end 

  namespace :movies do
    root to: 'movies#index'
  end

  root to: 'home#index'
end
