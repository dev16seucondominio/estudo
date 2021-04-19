angular.module('passagensApp').lazy
.controller("PassagensFormCtrl", [
  "indexFactory", "scAlert", "scTopMessages", "Passagem", function(indexFactory, scAlert, scTopMessages, Passagem) {
    vmForm = this

    vmForm.indexFactory = indexFactory

    vmForm.init = function(pessoa, baseFact){
      // vmForm.formFactory = baseFact

      baseFact.params = angular.copy(pessoa || { enderecos: [], contas: [], juridica: false, perfil_pagamentos: {} })
      delete baseFact.params.formFactory
    }

    return vmForm

  }
])
