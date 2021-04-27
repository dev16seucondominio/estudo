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
        if(!this.isNovo(vmForm.params)) {
          item = vmForm.formFactory.lista.getById(vmForm.params.id)
          angular.extend(item, vmForm.params)
          vmForm.formFactory.close(vmForm.params)
          vmForm.params.opened = true
        }        
      },
      isNovo: function(passagem) {
        if (passagem.id) { return false }
        vmForm.params.id += vmForm.formFactory.lista.length
        vmForm.formFactory.lista.unshift(vmForm.params)
        vmForm.formFactory.close(vmForm.params)
        vmForm.params.opened = true
        return true
        // vmForm.indexFactory.itemCtrl.handleList(data.passagem, { unshift_if_new: true })
      }
    }

    return vmForm

  }
])
