angular.module('pagadoresApp').lazy
.factory("formFactory", [
  function() {
    base_obj = function(pessoa) {
      return obj = {
        opened: false,
        new_record: false,
        lista: [ {pessoa: {}} ],

        init: function(pessoa) {
          this.pessoa = pessoa
          this.pessoa.editing = true

          this.opened = true
          this.new_record = pessoa.id ? false : true
        },

        close: function(pessoa){
          this.pessoa.editing = false
          this.pessoa = {}

          this.opened = false
        }

      }
    }
    return base_obj;
  },
])
