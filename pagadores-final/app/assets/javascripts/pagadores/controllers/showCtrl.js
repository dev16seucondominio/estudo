angular.module('pagadoresApp').lazy
.controller("PessoaCtrl", [
  "formFactory", "indexFactory", "Pagador", "scTopMessages", function(formFactory, indexFactory, Pagador, scTopMessages) {
    vmShow = this

    // vmShow.formFact = undefined
    // vmShow.pagador = undefined

    vmShow.init = function(pessoa, baseFact, indexFactory){
      vmShow.formFactory = baseFact
      vmShow.indexFactory = indexFactory

      // TODO
    }

    vmShow.accToggle = function(pessoa, callback){
      pessoa.opened = !pessoa.opened
      if (pessoa.editing) {
        pessoa.editing = !pessoa.editing
      }

      vmShow.carregarPessoa(pessoa, callback)
    }

    vmShow.carregarPessoa = function(pessoa, callback) {
      if (pessoa.carregando) { return }
      if (pessoa.carregado){
        if (callback) { callback() }
        return
      }

      pessoa.carregando = true

      params = {
        id: pessoa.id
      }

      Pagador.show(params,
        function(data) {
          pessoa.carregando = false

          vmShow.indexFactory.handleList(data.pagador)

          if (callback) { callback() }
        }, function(response) {
          pessoa.carregando = false

          console.log(response)
          scTopMessages.openDanger(response.data.errors, {timeOut: 3000})
        }
      )
    }

    vmShow.formCtrl = {
      open: function(pessoa) {
        vmShow.accToggle(pessoa, function(){
          pessoa.opened = true

          itemPessoa = vmShow.formFactory.lista.getById(pessoa.id)
          vmShow.formFactory.init(itemPessoa)
        })

      }
    }

    return vmShow

  }
])
