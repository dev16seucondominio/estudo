angular.module('passagensApp').lazy
.controller("PassagemCtrl", [
  "formFactory", "indexFactory", "Passagem", "scTopMessages", function(formFactory, indexFactory, Passagem, scTopMessages) {
    vmShow = this

    vmShow.indexFactory = indexFactory

    vmShow.init = function() { }


    return vmShow

  }
])
