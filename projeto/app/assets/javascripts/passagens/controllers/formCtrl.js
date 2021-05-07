(function() {
  angular.module('myApp').lazy
  .controller("PassagensFormCtrl", [
    "indexFactory", "scAlert", "scTopMessages", "Passagem",
      function(indexFactory, scAlert, scTopMessages, Passagem) {
      vmForm = this

      vmForm.indexFactory = indexFactory

      vmForm.init = function(baseFact){
        baseFact.params = angular.copy(baseFact.passagem || {})
        delete baseFact.params.formFactory
      }


      vmForm.formCadastro = {
        save: function(baseFact) {
          console.log(baseFact.params)
        Passagem.save(baseFact.params,
          function(data){
            vmForm.formCadastro.isNovo(data)

            vmForm.indexFactory.itemCtrl.handleList(data.passagem)

            scTopMessages.openSuccess(data.msg, {timeOut: 3000})

            baseFact.close()
          }, function(response){
            console.log(response)
            scTopMessages.openDanger(response.data.errors, {timeOut: 3000})
          }
        )
      },
      isNovo: function(data) {
        if (!data.novo) { return }
        data.passagem.novo = true
        vmForm.indexFactory.itemCtrl.handleList(data.passagem, { unshift_if_new: true })
      },
        addListaObj: function(baseFact) {
          if(baseFact.params.objetos) {
            baseFact.params.objetos.push({itens: [{}]})
          } else {
            baseFact.params = {objetos: [{itens: [{}]} ]}
          }
        },
        addItem: function(listObj) {
          listObj.itens.push({})
        }
      }

      return vmForm

    }
  ])
}).call(this);
