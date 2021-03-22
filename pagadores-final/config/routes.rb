Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'pagadores#index'

  resources :pagadores, only: [:index, :show, :destroy] do
  	collection do
  		post :submit
  		put  :update
  	end
  end

end
