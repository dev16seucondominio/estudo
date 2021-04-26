angular.module('myApp').lazy
.controller("PassagensFormCtrl", [
  "indexFactory", "scAlert", "scTopMessages", function(indexFactory, scAlert, scTopMessages) {
    vmForm = this

    vmForm.indexFactory = indexFactory

    vmForm.init = function(passagem, baseFact){
      vmForm.formFactory = baseFact
      vmForm.params = angular.copy(passagem || {})
      console.log(vmForm.params)
    }


    vmForm.formCadastro = {
      save: function(passagem) {

        if(!this.isNovo(passagem)) {
          item = vmForm.formFactory.lista.getById(passagem.id)
        }


        angular.extend(item, vmForm.params)
        vmForm.formFactory.close(item)
        vmForm.params.opened = true
      },
      isNovo: function(passagem) {
        if (passagem.id) { return true }
        vmForm.params.id = vmForm.formFactory.lista.length + 1
        vmForm.formFactory.lista.unshift(vmForm.params)
        // vmForm.indexFactory.itemCtrl.handleList(data.passagem, { unshift_if_new: true })
      }
    }

    return vmForm

  }
])
