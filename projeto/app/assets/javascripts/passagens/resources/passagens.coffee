angular.module('myApp').lazy
.factory 'Passagem', [
  '$resource'
  ($resource) ->
    encapsulateData = (data)-> JSON.stringify { passagem: data }

    $resource 'http://localhost:3000/passagem/:id.json', { id: "@id" },
      list:
        method: 'GET'
      show:
        method: 'GET'

      save:
        method: 'POST'
        url: 'http://localhost:3000/passagem/save.json'
        transformRequest: encapsulateData

      destroy:
        method: 'DELETE'
]
