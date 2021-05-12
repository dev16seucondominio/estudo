Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'pagadores#index'

  namespace :administrativo do
    resources :passagens, only: [:index, :show, :destroy] do
      collection do
        post :save
      end
    end
    resources :categorias, only: [:index, :show, :destroy] do
      collection do
        post :save
      end
    end
  end

  resources :pagadores, only: [:index, :show, :destroy] do
  	collection do
	    post :save
	  end
	end

end
