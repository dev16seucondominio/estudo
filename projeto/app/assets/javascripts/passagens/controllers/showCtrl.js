angular.module('myApp').lazy
.controller("PassagemCtrl", [
  "formFactory", "indexFactory", "scTopMessages", function(formFactory, indexFactory, scTopMessages) {
    vmShow = this

    vmShow.indexFactory = indexFactory

    vmShow.init = function(passagem){
      passagem.formFactory = new formFactory()
      vmShow.indexFactory.getCategoriaNome(passagem)
    }

    vmShow.accToggle = function(passagem) {
      if (passagem.editing) { passagem.editing = false}
      passagem.opened = !passagem.opened
    }

    vmShow.formCtrl = {
      open: function(passagem) {
        passagem.opened = true
        passagem.editing = true
      }
    }

    return vmShow

  }
])
