(function() {
  angular.module('myApp').lazy
  .controller("PassagemCtrl", [
    "formFactory", "indexFactory", "scTopMessages", "Passagem", function(formFactory, indexFactory, scTopMessages, Passagem) {
      vmShow = this

      vmShow.indexFactory = indexFactory

      vmShow.init = function(passagem){
        passagem.formFactory = new formFactory()
      }

      vmShow.accToggle = function(passagem) {
        if (passagem.editing) passagem.editing = false

        passagem.opened = !passagem.opened

        vmShow.carregarPassagem(passagem)
        
      }

      vmShow.carregarPassagem = function(passagem) {
        if (passagem.carregando || passagem.carregado) { return }
        Passagem.show(passagem,
          function(data) {
            passagem.carregando = false

            vmShow.indexFactory.itemCtrl.handleList(data.passagem)
          },
          function(response) {
            passagem.carregando = false
            scTopMessages.openDanger(response.data.errors, {timeOut: 3000})
          }
        )
      }

      vmShow.formCtrl = {
        open: function(passagem) {
          passagem.menuReticiencias = false

          vmShow.accToggle(passagem)

          passagem.editing = true
        }
      }

      vmShow.menuReticiencias = {
        toggle: function(passagem) {
          passagem.menuReticiencias = !passagem.menuReticiencias
        }
      }

      return vmShow

    }
  ])
}).call(this);
