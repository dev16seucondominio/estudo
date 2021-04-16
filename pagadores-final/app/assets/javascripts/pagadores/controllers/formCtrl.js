angular.module('pagadoresApp').lazy
.controller("PessoasFormCtrl", [
  "formFactory", "indexFactory", "scAlert", "scTopMessages", "Pagador", function(formFactory, indexFactory, scAlert, scTopMessages, Pagador) {
    vmForm = this

    vmForm.carregandoData = false

    vmForm.init = function(baseFact, indexFactory, pessoa){
      vmForm.params = angular.copy(pessoa || { enderecos: [], contas: [], juridica: false, perfil_pagamentos: {} })
      vmForm.indexFactory = indexFactory
      vmForm.formFactory = baseFact
    }

    vmForm.formEnd = {
      add: function() {
        vmForm.params.enderecos.push({
          principal: (vmForm.params.enderecos < 1 ? true : false)
        })
      },
      rmv: function(end) {
        vmForm.params.enderecos.remove(end)
      },
      setPrincipal: function(listEnd, end) {
        for(i in listEnd) {
          listEnd[i].principal = false
        }
        end.principal = true
      }
    }

    vmForm.formConta = {
      add: function() {
        vmForm.params.contas.push({
          principal: (vmForm.params.contas.length < 1 ? true : false),
          juridica: false,
          doc: (vmForm.params.doc ? angular.copy(vmForm.params.doc) : ''),
          responsavel: (angular.copy(vmForm.params.nome))
        })
      },
      setBanco: function(banco, conta) {
        conta.banco_id = banco.id
        vmForm.indexFactory.getBancoNome(vmForm.params)
      },
      setPrincipal: function(listaContas, conta) {
        for(i in listaContas) {
          listaContas[i].principal = false
        }
        conta.principal = true
      }
    }

    vmForm.formCadastro = {
      salvar: function(pessoa) {
        if (!this.isValido()){ return }
        Pagador.save(vmForm.params,
          function(data){
            vmForm.formCadastro.isNovo(data)

            vmForm.indexFactory.handleList(data.pagador)

            scTopMessages.openSuccess(data.msg, {timeOut: 3000})

            vmForm.formFactory.close()
          }, function(response){
            console.log(response)
            scTopMessages.openDanger(response.data.errors, {timeOut: 3000})
          }
        )
      },
      isValido: function() {
        errors = []
        if(!vmForm.params.nome) {
          errors.push("Nome não pode ser vazio!")
          vmForm.erroNome = true
        }
        if (errors.empty()) { return true }
        scTopMessages.openDanger(errors.join('; '), {timeOut: 3000})
        return false
      },
      isNovo: function(data) {
        if (!data.novo) { return }
        vmForm.params.novo = true
        angular.extend(vmForm.params, data.pagador)
        vmForm.formFactory.lista.unshift(vmForm.params)
      }
    }



    return vmForm

  }
])
