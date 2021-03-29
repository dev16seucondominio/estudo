angular.module('pagadoresApp').lazy
.controller("PessoaCtrl", ["formFactory", "Pagador", function(formFactory, Pagador) {
  vmShow = this

  // vmShow.formFact = undefined
  // vmShow.pessoa = undefined

  vmShow.init = function(pessoa, baseFact){
    
    vmShow.formFactory = baseFact
  }


  vmShow.accToggle = function(pessoa){
    pessoa.opened = !pessoa.opened
    pessoa.editing = false
    vmShow.carregarPagador(pessoa)
  }

  vmShow.carregarPagador = function(pagador) {
    if (pagador.carregado) return
    params = {id: pagador.id}
    return Pagador.show(params, (function(_this) {
      return function(data, resp, arg) {
        for(i in vmShow.formFactory.lista) {
          if(vmShow.formFactory.lista[i].id == pagador.id){
            vmShow.formFactory.lista[i] = angular.extend(data.pagador)
            vmShow.formFactory.lista[i].carregado = true
            vmShow.formFactory.lista[i].opened = true
          }
        }
        return _this.carregando = true
      }
    })(this))
    
  }

  vmShow.formCtrl = {
    opened: !this.opened,

    open: function(pessoa) {
      if (pessoa.opened) {
        return
      }

      this.opened = true
      vmShow.accToggle(pessoa)

    }
  }

  return vmShow

  }
])
