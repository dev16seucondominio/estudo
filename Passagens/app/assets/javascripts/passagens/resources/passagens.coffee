angular.module('passagensApp').lazy
.factory 'Passagem', [
  '$resource'
  ($resource) ->
    encapsulateData = (data)-> JSON.stringify { passagem: data }

    $resource 'http://localhost:3000/passagens/:id.json', { id: "@id" },
      list:
        method: 'GET'
      show:
        method: 'GET'

      save:
        method: 'POST'
        url: 'http://localhost:3000/passagens/save.json'
        transformRequest: encapsulateData

      destroy:
        method: 'DELETE'
]
