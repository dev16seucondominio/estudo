angular.module('pagadoresApp').lazy
.controller("PessoaCtrl", ["formFactory", "Pagador", function(formFactory, Pagador) {
  vmShow = this

  // vmShow.formFact = undefined
  // vmShow.pessoa = undefined

  vmShow.init = function(pessoa, baseFact){
    vmShow.formFactory = baseFact
  }


  vmShow.accToggle = function(pessoa){
    console.log("aqui", pessoa)
    pessoa.opened = !pessoa.opened
    pessoa.editing = false
    vmShow.carregarPessoa(pessoa)
  }

  vmShow.carregarPessoa = function(pessoa) {
    params = angular.copy(pessoa)
    if(params.carregado) { 
      return 
    }
    Pagador.show(params, 
      function(data) {
        for (i in vmShow.formFactory.lista) {
          if(vmShow.formFactory.lista[i].id == data.pagador.id){
            vmShow.itemPagador = vmShow.formFactory.lista[i]
            angular.extend(vmShow.itemPagador, data.pagador)
            vmShow.itemPagador.carregado = true
          }
        }
      }, function(response) {
        console.log("Algum erro: ",response)
      }
    )
  }

  vmShow.formCtrl = {
    opened: !this.opened,

    open: function(pessoa) {
      if (pessoa.opened) { return }
      this.opened = true
    }
  }

  return vmShow

  }
])
