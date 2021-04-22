angular.module('myApp').lazy
.controller("PessoasFormCtrl", [
  "indexFactory", "scAlert", "scTopMessages", "Pagador", function(indexFactory, scAlert, scTopMessages, Pagador) {
    vmForm = this

    vmForm.indexFactory = indexFactory

    vmForm.init = function(pessoa, baseFact){
      // vmForm.formFactory = baseFact

      baseFact.params = angular.copy(pessoa || { enderecos: [], contas: [], juridica: false, perfil_pagamentos: {} })
      delete baseFact.params.formFactory
    }

    vmForm.formEnd = {
      add: function(baseFact) {
        baseFact.params.enderecos.push({
          principal: (baseFact.params.enderecos < 1 ? true : false)
        })
      },
      setPrincipal: function(listEnd, end) {
        for(i in listEnd) {
          listEnd[i].principal = false
        }
        end.principal = true
      }
    }

    vmForm.formConta = {
      add: function(baseFact) {
        baseFact.params.contas.push({
          principal: (baseFact.params.contas.length < 1 ? true : false),
          juridica: false,
          doc: (baseFact.params.doc ? angular.copy(baseFact.params.doc) : ''),
          responsavel: (angular.copy(baseFact.params.nome))
        })
      },
      setBanco: function(baseFact, banco, conta) {
        conta.banco_id = banco.id
        vmForm.indexFactory.getBancoNome(baseFact.params)
      },
      setPrincipal: function(listaContas, conta) {
        for(i in listaContas) {
          listaContas[i].principal = false
        }
        conta.principal = true
      }
    }

    vmForm.formCadastro = {
      salvar: function(pessoa, baseFact) {
        if (!this.isValido(baseFact)){ return }
        Pagador.save(baseFact.params,
          function(data){
            vmForm.formCadastro.isNovo(data)

            vmForm.indexFactory.itemCtrl.handleList(data.pagador)

            scTopMessages.openSuccess(data.msg, {timeOut: 3000})

            baseFact.close()
          }, function(response){
            console.log(response)
            scTopMessages.openDanger(response.data.errors, {timeOut: 3000})
          }
        )
      },
      isValido: function(baseFact) {
        errors = []
        if(!baseFact.params.nome) {
          errors.push("Nome não pode ser vazio!")
          vmForm.erroNome = true
        }
        if (errors.empty()) { return true }
        scTopMessages.openDanger(errors.join('; '), {timeOut: 3000})
        return false
      },
      isNovo: function(data) {
        if (!data.novo) { return }
        data.pagador.novo = true
        vmForm.indexFactory.itemCtrl.handleList(data.pagador, { unshift_if_new: true })
      }
    }

    return vmForm

  }
])
