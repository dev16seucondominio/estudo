angular.module('myApp').lazy
.controller("PassagemCtrl", [
  "formFactory", "indexFactory", "scTopMessages", function(formFactory, indexFactory, scTopMessages) {
    vmShow = this

    vmShow.indexFactory = indexFactory

    vmShow.init = function(passagem){
    }


    return vmShow

  }
])
