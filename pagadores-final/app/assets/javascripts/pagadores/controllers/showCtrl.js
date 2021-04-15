angular.module('pagadoresApp').lazy
.controller("PessoaCtrl", [
  "formFactory", "Pagador", "scTopMessages", function(formFactory, Pagador, scTopMessages) {
    vmShow = this

    // vmShow.formFact = undefined
    // vmShow.pagador = undefined

    vmShow.init = function(pessoa, baseFact){
      vmShow.formFactory = baseFact
      // TODO
    }

    vmShow.accToggle = function(pagador, callback){
      if (pagador.editing) { pagador.editing = false }
      pagador.opened = !pagador.opened

      vmShow.carregarPessoa(pagador, callback)
    }

    vmShow.carregarPessoa = function(pagador, callback) {
      if (pagador.carregando) { return }
      if (pagador.carregado){
        if (callback) { callback() }
        return
      }

      pagador.carregando = true

      params = {
        id: pagador.id
      }

      Pagador.show(params,
        function(data) {
          pagador.carregando = false

          vmShow.formFactory.handleList(data.pagador)

          if (callback) { callback() }
        }, function(response) {
          pagador.carregando = false

          console.log(response)
          scTopMessages.openDanger(response.data.errors, {timeOut: 3000})
        }
      )
    }

    vmShow.formCtrl = {
      open: function(pagador) {
        vmShow.accToggle( pagador, function(){
          pagador.opened = true

          itemPagador = vmShow.formFactory.lista.getById(pagador.id)
          vmShow.formFactory.init(itemPagador)
        })

      }
    }

    return vmShow

  }
])
