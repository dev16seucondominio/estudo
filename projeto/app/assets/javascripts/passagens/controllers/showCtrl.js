angular.module('myApp').lazy
.controller("PassagemCtrl", [
  "formFactory", "indexFactory", "scTopMessages", function(formFactory, indexFactory, scTopMessages) {
    vmShow = this

    vmShow.indexFactory = indexFactory

    vmShow.init = function(passagem){
      vmShow.formFactory = new formFactory
    }

    vmShow.accToggle = function(passagem) {
      if (passagem.editing) { passagem.editing = false}
      passagem.opened = !passagem.opened
    }

    vmShow.formCtrl = {
      open: function(passagem) {
        vmShow.formFactory.open(passagem)
      }
    }

    return vmShow

  }
])
