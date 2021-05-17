(function() {
  angular.module('myApp').lazy
  .controller("PassagemCtrl", [
    "formFactory", "indexFactory", "scTopMessages", function(formFactory, indexFactory, scTopMessages) {
      vmShow = this

      vmShow.indexFactory = indexFactory

      vmShow.init = function(passagem){
        passagem.formFactory = new formFactory()
      }

      vmShow.accToggle = function(passagem) {
        if (passagem.editing) { passagem.editing = false}
        passagem.opened = !passagem.opened
      }

      vmShow.formCtrl = {
        open: function(passagem) {
          console.log(passagem)
          passagem.opened = true
          passagem.editing = true
          passagem.menuReticiencias = false
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
