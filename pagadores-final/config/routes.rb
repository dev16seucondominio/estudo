Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'pagadores#index'

  #  esse aqui eh parceiro da resource, mas ja no server side... aqui vc define as rotas esperadas pelo servidor, usando as mesmas keys q vc usar no resource.coffee

  resources :pagadores, only: [:index, :show, :destroy] do # pras resources de pagadores... o only eh a array de keys que funcionam como um default, sem seguranca ou tratamento especial..., index show e destroy sao metodos q geralmente nao requerem config ou liberacao especial, entao eh meio q um padrao usar nesse formato< nem o destroy? ss, talvez seja bugante pq vc deve estar pensando "entao qualquer um pode excluir a hora q quiser?", mas aqui eh so rota. rota eh tipo um caminho por onde alguem pode passar, mas nao significa q esse alguem vai passar por la... pode ter um bloqueio a parte no meio do caminho (ai entram as permissoes das telas e bla bla bla)
  	collection do
  		# esse bloco aqui eu explico melhor mais pra frente, mas basicamente eh declaracao de rotas especiais e nao esperadas pelos metodos padrao de requisicao html... nenhum bixo de 7 cabeçcas, so um caso especial
  		post :submit
  		put  :update
  	end
  	## aelm de estarem alinhados (resource - routes), os nomes do metodos tambem precisam ser iguais aos metodos que vc declara no CONTROLLER... daqui ele bate no controller da tela, de acordo com o metodo chamado
  end

end
