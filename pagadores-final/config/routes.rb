Rails.application.routes.draw do
  get 'pagadores/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'pagadores#index'
end
