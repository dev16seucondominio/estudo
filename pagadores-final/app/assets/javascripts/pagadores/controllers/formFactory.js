angular.module('pagadoresApp').lazy
.factory("formFactory", [
  function() {
    base_obj = function(pagador) {
      return obj = {
        opened: false,
        new_record: false,
        lista: [ {pagador: {}} ],

        init: function(pagador) {
          this.pagador = pagador
          this.opened = true
          this.new_record = pagador.id ? false : true
          pagador.editing = true
        },

        close: function(pagador){
          this.pagador = {}
          this.editing = false
          this.opened = false
        }

      }
    }
    return base_obj;
  },
])
