angular.module('pagadoresApp').lazy
.factory 'Pagador', [
	'$resource'
	($resource) ->
		encapsulateData = (data)-> JSON.stringify { pagador: data }

		$resource 'http://localhost:3000/pagadores/:id.json', { id: "@id" },
			list:
				method: 'GET'
]