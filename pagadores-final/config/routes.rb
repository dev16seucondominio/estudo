Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'pagadores#index'

  #  esse aqui eh parceiro da resource, mas ja no server side... aqui vc define as rotas esperadas pelo servidor, usando as mesmas keys q vc usar no resource.coffee
                              # index = list
  resources :pagadores, only: [:index, :show, :destroy]

end
