(function() {
  angular.module("myApp").lazy.controller("PassagensCtrl", [
    "formFactory", "indexFactory", "scAlert", "scTopMessages", "Templates", "Passagem",
      function(formFactory, indexFactory, scAlert, scTopMessages, Templates, Passagem) {
      vmIdx = this

      vmIdx.templates = Templates

      vmIdx.formFactory  = undefined
      vmIdx.indexFactory = undefined

      vmIdx.init = function(passagem){
        vmIdx.formFactory = new formFactory()
        vmIdx.listCtrl.init()
        vmIdx.formFactory.lista = vmIdx.listCtrl.list
        vmIdx.indexFactory = indexFactory
        vmIdx.indexFactory.itemCtrl = vmIdx.itemCtrl
        vmIdx.menu_quem_sai = {isOn: false}
        vmIdx.menu_quem_entra = {isOn: false}
      }

      vmIdx.desativarPassagem = {
        beforeDesativar: function(passagem) {
          this.params = angular.copy(passagem)
          scAlert.open({
            title: 'Você tem certeza que deseja desativar a passagem?',
            buttons: [
              {
                label: 'Não',
                color: 'gray'
              }, {
                label: 'Sim',
                color: 'yellow',
                action: function() {
                  vmIdx.desativarPassagem.desativar()
                }
              }
            ]
          })
        },
        desativar: function() {
          this.params = Object.slice(this.params, 'id', 'status')
          this.params.micro_update_type = "desativar"
          Passagem.micro_update(this.params, 
            function(data) {
              scTopMessages.openSuccess("Passagem desativada com sucesso.", {timeOut: 3000})
            },
            function(response) {
              scTopMessages.openDanger(response.data.errors, {timeOut: 3000})
            }
          )
        }
      }

      vmIdx.passarServicoCtrl = {
        modal: { active: false },
        open: function(passagem) {
          this.params = angular.copy(passagem)
          this.modal.active = true
        },
        close: function() {
          this.params = {}
          this.modal.active = false
        },
        passarServico: function() {
          this.params = Object.slice(this.params, 'id', 'observacoes', 'user_entrou_id', 'user_saiu_id',
            'user_saiu_senha', 'user_entrou_senha', 'user_entrou', 'user_saiu')
          this.params.micro_update_type = "passar_servico"
          Passagem.micro_update(this.params,
            function(data) {
              vmIdx.itemCtrl.handleList(data.passagem)

              scTopMessages.openSuccess("Registro atualizado com sucesso.", {timeOut: 3000})
              vmIdx.passarServicoCtrl.close()
            }, function(response) {
              console.log(response)
              scTopMessages.openDanger(response.data.errors, {timeOut: 3000})
            }
          )
        },
        setUserSai: function(user) {
          this.params.user_saiu = {nome: user.nome}
          this.params.user_saiu_id = user.id
          this.toggleUserSai()
        },
        toggleUserSai: function() {
          vmIdx.menu_quem_sai.isOn = !vmIdx.menu_quem_sai.isOn
        },
        toggleUserEntra: function() {
          vmIdx.menu_quem_entra.isOn = !vmIdx.menu_quem_entra.isOn
        },
        setUserEntra: function(user) {
          this.params.user_entrou = {nome: user.nome}
          this.params.user_entrou_id = user.id
          this.toggleUserEntra()
        }
      }

      vmIdx.listCtrl = {
        carregando: false,
        list: [],
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

          Passagem.list(params,
            function(data) {
              loadSettings(data)
              console.log(data)
              vmIdx.listCtrl.list = angular.copy(data.list)
            }, function(response) {
              console.log("Pode ter acontecido algum erro.", response)
            }
          )


        },
        beforeExcluirRegistro: function(passagem) {
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
        execExcluirRegistro: function(passagem) {
          console.log(passagem)
          Passagem.destroy(passagem,
            function(data) {
              scTopMessages.openSuccess(data.msg, {timeOut: 3000})
              vmIdx.listCtrl.list.remove(vmIdx.listCtrl.list.getById(passagem.id))
            }, function(response) {

            }
          )
        },
        duplicarRegistro: function(passagem) {
          novaPassagem = angular.copy(passagem)
          delete novaPassagem.id
          delete novaPassagem.quem_entra
          delete novaPassagem.quem_sai
          delete novaPassagem.user_entrou_senha
          delete novaPassagem.user_saiu_senha
          vmIdx.formFactory.init(novaPassagem)
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
                item.editing = false
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
        vmIdx.settings = data.settings.passagens
        vmIdx.settings = vmIdx.settings
        vmIdx.indexFactory.settings = vmIdx.settings
      }

      return vmIdx

    }
  ]
)
}).call(this);
