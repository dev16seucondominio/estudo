angular.module('pagadoresApp').lazy
.controller("PessoaCtrl", ["Pagador", function(Pagador) {
  vmShow = this

  vmShow.formFact = undefined
  // vmShow.pessoa = undefined

  vmShow.init = function(pessoa){
    pessoa.acc = { opened: false }
  }

  vmShow.accToggle = function(pessoa){
    params = pessoa.id
    console.log(params)
    Pagador.show(params)
    console.log(pessoa)
    pessoa.acc.opened = !pessoa.acc.opened
    pessoa.editing = false
  }

  vmShow.formCtrl = {
    opened: !this.opened,

    open: function(pessoa) {
      if (pessoa.acc.opened) {
        return
      }

      this.opened = true
      vmShow.accToggle(pessoa)

    }
  }

  return vmShow

  }
])
