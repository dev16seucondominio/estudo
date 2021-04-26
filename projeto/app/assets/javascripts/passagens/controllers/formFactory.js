angular.module('myApp').lazy
.factory("formFactory", [
  function() {
    base_obj = function(passagem) {
      return obj = {
        opened: false,
        new_record: false,
        lista: [ {passagem: {}} ],

        init: function(passagem) {
          passagem.editing = true
          passagem.opened = true

          if(passagem.id) {
            this.new_record = false
          } else {
            this.new_record = true
            passagem = {}
          }
        },
        open: function(passagem) {
          passagem.opened = true
          passagem.editing = true
          this.opened = true
          this.new_record = false
        },
        close: function(passagem) {
          passagem.editing = false
          this.opened = false
          this.new_record = false
        }

      }
    }
    return base_obj;
  },
])
