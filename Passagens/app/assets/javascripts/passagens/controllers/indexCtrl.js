angular.module("passagensApp").lazy
.controller("PassagensCtrl", [
  "formFactory", "indexFactory", "scAlert", "scTopMessages", "Templates", "Passagem", function(formFactory, indexFactory, scAlert, scTopMessages, Templates, Passagem) {
    vmIdx = this

    vmIdx.templates = Templates

    vmIdx.formFactory  = undefined
    vmIdx.indexFactory = undefined

    vmIdx.init = function(){
      vmIdx.formFactory = new formFactory()
      vmIdx.listCtrl.init()

      vmIdx.indexFactory = indexFactory
      vmIdx.indexFactory.itemCtrl = vmIdx.itemCtrl
      vmIdx.indexFactory.getBancoNome = getBancoNome
    }

    vmIdx.listCtrl = {
      carregando: false,
      list: [],
      with_settings: true,
      alertExcluirRegistro: function(passagem) {
        scAlert.open({
          title: 'Você tem certeza que deseja excluir essa passagem?',
          messages: 'Todos os dados serão perdidos!',
          buttons: [
            {
              label: 'Não',
              color: 'gray'
            }, {
              label: 'Sim',
              color: 'yellow',
              action: function() {
                vmIdx.listCtrl.execExcluirRegistro(passagem)
              }
            }
          ]
        })
      },
      execExcluirRegistro: function(passagem){
        Passagem.destroy(passagem,
          function(data){
            scTopMessages.openSuccess(data.msg, {timeOut: 3000})
            vmIdx.listCtrl.list.splice(vmIdx.listCtrl.list.indexOf(passagem), 1)
          }, function(response){
            scTopMessages.openDanger(response.data.errors, {timeOut: 3000})
          }
        )
      }
    }

    vmIdx.itemCtrl = {
      get: function(item){
        itemId = null
        if (isObject(item)){ itemId = item.id }
        if (!itemId){ itemId = item }

        return vmIdx.listCtrl.list.getById(itemId)
      },
      handleList: function(list, opts={}) {
        list = [list].flattenCompact()

        for (var i = 0; i < list.length; i++) {
          item = list[i]

          itemPassagem = this.get(item)
          if (!itemPassagem){
            if (opts.unshift_if_new){
              vmIdx.listCtrl.list.unshift(item)
            }
            continue
          }

          item.carregado = true

          angular.extend(itemPassagem, item)
        }
      }
    }

    // Settings
    loadSettings = function(data){
      vmIdx.settings = data.settings
      vmIdx.indexFactory.settings = vmIdx.settings

      vmIdx.filtro.init()

      // vmIdx.localeContas = data.locales.contas
    }

    return vmIdx

  }
])
