pagadoresFinanc.controller("showCtrl",
  function() {
    vmShow = this

    vmShow.formFact = undefined
    // vmShow.pessoa = undefined

    vmShow.init = function(pessoa){
      pessoa.acc = { opened: false }
    }

    vmShow.accToggle = function(pessoa){
      pessoa.acc.opened = !pessoa.acc.opened
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

    vmShow.pessoa.endereco_principal = {
      find: function(pessoa) {
        pessoa.enderecos.principal
      }
    }

    return vmShow

  }
)
