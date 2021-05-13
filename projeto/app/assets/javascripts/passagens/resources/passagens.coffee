angular.module('myApp').lazy
.factory 'Passagem', [
  '$resource'

  ($resource) ->
    encapsulateData = (data)-> JSON.stringify { passagem: data }

    $resource 'http://localhost:3000/administrativo/passagens/:id.json', { id: "@id" },
      list:
        method: 'GET'
      show:
        method: 'GET'

      save:
        method: 'POST'
        url: 'http://localhost:3000/administrativo/passagens/save.json'
        transformRequest: encapsulateData

      micro_update:
        method: 'PUT'
        url: 'http://localhost:3000/administrativo/passagens/micro_update.json'
        transformRequest: encapsulateData

      destroy:
        method: 'DELETE'
]
