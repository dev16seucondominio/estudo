pagadoresFinanc.factory("formFactory", [
  function() {
    base_obj = function() {
      return obj = {
        opened: false,
        new_record: false,
        lista: [ {pessoa: {}} ],

        init: function(pessoa) {
          this.pessoa = pessoa
          this.opened = true
          this.new_record = pessoa.id ? false : true
          pessoa.editing = true
        },

        close: function(){
          this.pessoa = {}
          this.opened = false
        },

        adicionarPessoa: function(pessoa) {
          this.pessoa = pessoa
          return this.pessoa
        },

        atualizarLista: function(lista, pessoa) {
          angular.unshiftOrExtend(lista, pessoa)
        }
      }
    }
    return base_obj;
  },
])
