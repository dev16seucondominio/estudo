class PagadoresService 
  set model: Pagador
  def index

    pagadores = model.all ## essa aqui eh uma listagem de todos os registros... eh o banco de dados inteiro
    pagadores = model.buscar(params) #este busca eh um metodo a ser construido no model, pra fazer busca especificas... por nome, por cpf, por cliente (condominio) etc... vamo fazer da maneira mais simples primeiro, depois a gente refina a busca 
    

  # 	# a lista de pagadores tu pode fazer aqui dentro msm, pq faz parte da logica de negocio do index retornar uma listagem base de registros da tela
  # 	pagadores = pagadores.where(params)

  # 	# aqui vc tem que retornar duas coisas... o status e a resp
  # 	# o status depende do q vc conseguir... se der um erro na busca, por exemplo, tu tem q retornar um error... ai eh so escrever logica memo
  # 		if error
  # 			[:error, {errors.messages.full} ] 
		# 	else
		# 		[:success, { obj} ] ó o formato... eh uma array simples
  # 	 # a chamada sim, o codigo ce faz um private aqui dentro
  # end
    

  # def self.load_settings(opts, params)
  	# nao vai usar algo do tipo agora, mas qnd for a hora te ensino melhor
  # end
end
