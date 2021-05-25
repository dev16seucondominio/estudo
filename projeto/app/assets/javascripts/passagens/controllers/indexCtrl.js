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

      vmIdx.microUpdateCtrl = {
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
              vmIdx.microUpdateCtrl.close()
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
        },
        beforeReativar: function(passagem) {
          this.params = angular.copy(passagem)
          scAlert.open({
            title: 'Deseja mesmo reativar a passagem?',
            buttons: [
              {
                label: 'Não',
                color: 'gray'
              }, {
                label: 'Sim',
                color: 'yellow',
                action: function() {
                  vmIdx.microUpdateCtrl.reativar()
                }
              }
            ]
          })
        },
        reativar: function() {
          this.params = Object.slice(this.params, 'id', 'status')
          this.params.micro_update_type = "reativar"
          Passagem.micro_update(this.params,
            function(data) {
              scTopMessages.openSuccess("Passagem reativada com sucesso.", {timeOut: 3000})
              vmIdx.listCtrl.loadList()
            },
            function(response) {
              scTopMessages.openDanger(response.data.errors, {timeOut: 3000})
            }
          )
        },
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
                  vmIdx.microUpdateCtrl.desativar()
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
              vmIdx.listCtrl.loadList()
            },
            function(response) {
              scTopMessages.openDanger(response.data.errors, {timeOut: 3000})
            }
          )
        }
      }

      vmIdx.listCtrl = {
        carregando: false,
        list: [],
        with_settings: true,
        init: function(){
          params = {}
          this.exec()
        },
        loadList: function(){
          this.list = []
          this.exec()
        },
        exec: function() {
          params ||= {}

          params.filtro        = vmIdx.filtro.params
          params.with_settings = vmIdx.listCtrl.with_settings

          Passagem.list(params,
            function(data) {
              console.log(data)
              if(!params.filtro.filtrado) {
                loadSettings(data)
              } else {
              }

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
              scTopMessages.openDanger(response.data.errors, {timeOut: 3000})
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
        params: {},
        init: function(){
          this.paramsInit = angular.copy(vmIdx.settings.filtro)
          this.params = angular.copy(this.paramsInit)
          this.params.data_inicio = new Date(this.params.data_inicio)
          this.params.data_fim = new Date(this.params.data_fim)
          this.initStatus()
        },
        exec: function(tipo){
          if(tipo == 'avancado') {
            this.params.q = ''
            this.params.avancado = true
          }
          this.avancado = false
          this.params.filtrado = true
          vmIdx.listCtrl.loadList()
        },
        limpar: function() {
          this.params = angular.copy(this.paramsInit)
          console.log(this.paramsInit)
          vmIdx.listCtrl.loadList()
        },
        setStatus: function(opcao) {
          if(opcao.active) {
            this.params.status.remove(opcao.key)
          } else {
            this.params.status.push(opcao.key)
          }
          opcao.active = !opcao.active
        },
        initStatus: function() {
          for (var i = 0; i < vmIdx.settings.lista_status.length; i++) {
            if(vmIdx.settings.lista_status[i].active) this.params.status.push(vmIdx.settings.lista_status[i].key)
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
      loadSettings = function(data) {
        vmIdx.settings = data.settings.passagens
        vmIdx.indexFactory.settings = vmIdx.settings

        vmIdx.filtro.init()
      }

      return vmIdx

    }
  ]
)
}).call(this);
