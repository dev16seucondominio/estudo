angular.module('pagadoresApp').lazy
.controller("PessoaCtrl", ["Pagador", function(Pagador) {
  vmShow = this

  vmShow.formFact = undefined
  // vmShow.pessoa = undefined

  vmShow.init = function(pessoa){
    pessoa.opened = false
    vmShow.params = pessoa
  }


  vmShow.accToggle = function(pessoa){
    pessoa.opened = true
    if(vmShow.pessoaAntiga) {
      vmShow.pessoaAntiga.opened = false
    }
    if (pessoa == vmShow.pessoaAntiga){
      pessoa.opened = false
    }
    pessoa.editing = false
    pessoa.carregado = false
    vmShow.carregarPagador.exec(pessoa)
    vmShow.pessoaAntiga = pessoa
  }

  vmShow.a = function(){
    console.log(vmShow.carregarPagador.pessoaAtual)
  }

  vmShow.carregarPagador = {
    pessoaAtual: {},
    carregando: false,
    exec: function(pagador) {
      if (vmShow.carregando) return
      vmShow.carregarPagador.carregando = true
      params = {}
      params.id = pagador.id
      return Pagador.show(params, (function(_this) {
        return function(data, resp, arg) {
          vmShow.carregarPagador.pessoaAtual = angular.copy(data.pagador)
          vmShow.carregarPagador.pessoaAtual.carregado = true
          return _this.carregando = true
        }
      })(this))
    }
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
