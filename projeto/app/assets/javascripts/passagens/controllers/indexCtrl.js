angular.module("myApp").lazy
.controller("PassagensCtrl", [
  "formFactory", "indexFactory", "scAlert", "scTopMessages", "Templates", function(formFactory, indexFactory, scAlert, scTopMessages, Templates) {
    vmIdx = this

    vmIdx.templates = Templates

    vmIdx.formFactory  = undefined
    vmIdx.indexFactory = undefined

    vmIdx.init = function(){
      vmIdx.formFactory = new formFactory()
      vmIdx.listCtrl.init()
      vmIdx.formFactory.lista = vmIdx.listCtrl.list
      vmIdx.indexFactory = indexFactory
      vmIdx.indexFactory.itemCtrl = vmIdx.itemCtrl
    }

    vmIdx.listCtrl = {
      carregando: false,
      list: [
        { id: 1 ,quem_sai: "Igor Santos", senha_quem_sai: "123456", quem_entra: "Lucas Santos",
          senha_quem_entra: "654321", perfil_de_passagem: "padrao", lista_objetos:
          [
            { id: 1, categoria: "Controles", lista_itens:
              [
                { id: 1, descricao: "Academia", qtd: 2 }, { id: 2, descricao: "SPA", qtd: 3 }
              ]
            },
            { id: 2, categoria: "Cameras", lista_itens:
              [
                { id: 4, descricao: "Portaria", qtd: 5 }, { id: 4, descricao: "Garagem", qtd: 4 }
              ]
            }
          ], observacoes: "Deixo meu posto para sempre."
        },
        { id: 2 ,quem_sai: "Lucas Santos", senha_quem_sai: "654321", quem_entra: "Igor Santos",
          senha_quem_entra: "123456", perfil_de_passagem: "padrao", lista_objetos:
          [
            { id: 3, categoria: "Controles", lista_itens:
              [
                { id: 5, descricao: "Academia", qtd: 2 }, { id: 6, descricao: "SPA", qtd: 3 }
              ]
            },
            { id: 2, categoria: "Cameras", lista_itens:
              [
                { id: 7, descricao: "Portaria", qtd: 5 }, { id: 8, descricao: "Garagem", qtd: 4 }
              ]
            }
          ], observacoes: "Deixo meu posto sem nenhuma informação importante."
        }
      ],
      with_settings: true,
      init: function(){
        params = {}
        this.exec(params)
      },
      loadList: function(params){
        this.list = []
        this.exec(params)
      },
      exec: function(params) {

        params ||= {}

        params.filtro        = vmIdx.filtro.params
        params.with_settings = vmIdx.listCtrl.with_settings

      },
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
        scTopMessages.openSuccess("Registro excluído com sucesso", {timeOut: 3000})
        vmIdx.listCtrl.list.splice(vmIdx.listCtrl.list.indexOf(passagem), 1)
      }    
    }

    vmIdx.filtro = {
      listar: {},
      params: {},
      init: function(){
        this.paramsInit = angular.copy(vmIdx.settings.passagens.filtro)
        this.params = angular.copy(this.paramsInit)
      },

      exec: function(tipo){
        vmIdx.listCtrl.loadList()
        this.avancado = false
        this.params.filtrado = true
      },
      limpar: function() {
        this.params = angular.copy(this.paramsInit)
        this.params.filtrado = false
        vmIdx.listCtrl.loadList()
        for(i in vmIdx.settings.passagens.lista_opcoes) {
          vmIdx.settings.passagens.lista_opcoes[i].active = false
        }
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
    }

    return vmIdx

  }
])
