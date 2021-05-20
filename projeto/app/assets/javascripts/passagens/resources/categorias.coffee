angular.module('myApp').lazy
.factory 'Categoria', [
  '$resource'

  ($resource) ->
    encapsulateData = (data)-> JSON.stringify { categoria: data }

    $resource '/administrativo/categorias/:id.json', { id: "@id" },
      list:
        method: 'GET'
      show:
        method: 'GET'

      save:
        method: 'POST'
        url: '/administrativo/categorias/save.json'
        transformRequest: encapsulateData

      destroy:
        method: 'DELETE'
]
