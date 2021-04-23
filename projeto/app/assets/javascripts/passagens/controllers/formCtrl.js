angular.module('myApp').lazy
.controller("PassagemFormCtrl", [
  "indexFactory", "scAlert", "scTopMessages", function(indexFactory, scAlert, scTopMessages) {
    vmForm = this

    vmForm.indexFactory = indexFactory

    vmForm.init = function(passagem, baseFact){
      baseFact.params = angular.copy(passagem || {})
      delete baseFact.params.formFactory
    }



    vmForm.formCadastro = {
      isNovo: function(data) {
        if (!data.novo) { return }
        data.pagador.novo = true
        vmForm.indexFactory.itemCtrl.handleList(data.passagem, { unshift_if_new: true })
      }
    }

    return vmForm

  }
])
