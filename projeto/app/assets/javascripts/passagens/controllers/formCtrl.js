angular.module('myApp').lazy
.controller("PassagensFormCtrl", [
  "indexFactory", "scAlert", "scTopMessages", "Passagem", 
    function(indexFactory, scAlert, scTopMessages, Passagem) {
    vmForm = this

    vmForm.indexFactory = indexFactory

    vmForm.init = function(baseFact){
      baseFact.params = angular.copy(baseFact.passagem || {})
    }


    vmForm.formCadastro = {
      save: function(baseFact) {
        this.isNovo(baseFact)
        Passagem.save(baseFact.params, 
          function(data) {
            console.log("Deu bão")
            vmForm.indexFactory.itemCtrl.handleList(baseFact.params, opts)
          }, function(response) {
            console.log("Deu erro")
          }
        )
        baseFact.close()

      },
      isNovo: function(baseFact) {
        baseFact.params.id ? opts = { unshift_if_new: false } : opts = { unshift_if_new: true }
      },
      addListaObj: function(baseFact) {
        baseFact.params.lista_objetos.push({lista_itens: []})
      },
      addItem: function(listObj) {
        listObj.lista_itens.push({})
      }
    }

    return vmForm

  }
])
