(function() {
  angular.module('myApp').lazy
  .factory("formFactory", [
    function() {
      base_obj = function(passagem) {
        return obj = {
          opened: false,
          new_record: false,
          lista: [ {passagem: {}} ],

          init: function(passagem) {
            this.passagem = passagem
            this.passagem.editing = true
            this.passagem.opened = true

            this.passagem.id ? this.new_record = false : this.new_record = true
          },
          close: function() {
            this.passagem.editing = false
            this.passagem.opened = true
            this.opened = false
            this.new_record = false
            this.passagem = {}
          }

        }
      }
      return base_obj;
    },
  ])
}).call(this);
