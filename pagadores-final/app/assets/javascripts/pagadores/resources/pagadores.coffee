angular.module('pagadoresApp').lazy
.factory 'Pagador', [
	'$resource'
	# esse eh um arquivo de resource, que trampa em conjunto com a rota. aqui vc define, no lado do cliente, as rotas disponiveis e o caminho a chegar no servidor... usamos os metodos basicos do html (get, delete, put, post) e keys para chamada
	($resource) ->
		encapsulateData = (data)-> JSON.stringify { pagador: data }

		$resource 'http://localhost:3000/pagadores/:id.json', { id: "@id" }, # resource principal do modulo... dela vc deriva e cria outras.... pagadores/delete, pagadores/post....
			list:
				method: 'GET'
				# o list já t feito, ele trabalha como o index da requisicao. a funcao dele é primariamente carregar a lista de registros da ltea, atraves do metodo http GET
				# ele vai bater na rota, que tambem configuramos ontem
				# cara apanga meu comentario :pqp:
				# o list eh o mais simples e praticamente obrigatorio. tbm chamado de index (server-side) eh o primeiro metodo a ser chamado no carregamento da tela... trás tudo que for necessario, bem como configuracoes e a listagem padrao dos registros (lista de pagadores, lista de espacos comuns... depende do modulo)

			# outro exemplo bem comum eh o save ou post, usado pra enviar registros ao banco de dados
			save:
				method: 'POST' # qnd vc estiver fazendo a parte de salvar o form a gente volta nele # mano, tá tudo ficando mais claro e deixando de ser bruxaria, mas com certeza vou ter muitaaaaaaaaaaaaaaaaaaaaaaas duvidas sobre isso td. mano, o tutorial util pra ti mesmo começa a partir desse arquivo... os anteriores eh full config, e vc nao tem que fazer... aqui ja eh configuracao de rota e pra cada modulo q tu fizer tu em que fazer, mas tem um padrao bem tranquilo de fazer. vai ter duvidas no começo sim, mas nada aqui eh extremamente dificil, vc vai ver

]