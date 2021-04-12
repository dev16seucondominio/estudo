angular.module('pagadoresApp').lazy
.factory 'Pagador', [
  '$resource'
  # esse eh um arquivo de resource, que trampa em conjunto com a rota. aqui vc define, no lado do cliente, as rotas disponiveis e o caminho a chegar no servidor... usamos os metodos basicos do html (get, delete, put, post) e keys para chamada
  ($resource) ->
    encapsulateData = (data)-> JSON.stringify { pagador: data }

    $resource 'http://localhost:3000/pagadores/:id.json', { id: "@id" }, # resource principal do modulo... dela vc deriva e cria outras.... pagadores/delete, pagadores/post....
      list:
        method: 'GET'
      show:
        method: 'GET'

      save:
        method: 'POST'
        url: 'http://localhost:3000/pagadores/save.json'
        transformRequest: encapsulateData

      destroy:
        method: 'DELETE'
]
