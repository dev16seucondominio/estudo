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
      }

      vmIdx.passarServicoModal = {
        menuUsertoggle: function(user){
          user == 'saiu' ? vmIdx.menuUserSaiu = !vmIdx.menuUserSaiu : vmIdx.menuUserEntrou = !vmIdx.menuUserEntrou
        },
        passarServico: function(passagem) {
          console.log(passagem)
          passagem.micro_update_type = "passar_servico"
          Passagem.micro_update(passagem,
            function(data) {
              scTopMessages.openSuccess("Registro atualizado com sucesso.", {timeOut: 3000})
            }, function(response) {
              scTopMessages.openDanger("Erro desconhecido", {timeOut: 3000})
            }
          )
        }
      }


      // Essa função não existirá mais.
      vmIdx.passarServico = function(passagem) {
        console.log(passagem)
        // Fazer verificação no front e no back
        modal = {active: true}
        passagem.status = "Relizada"
        passagem.menuReticiencias = false
        passagem.passar_servico_modal = {active: true}
      }

      vmIdx.closePassar = function(passagem) {
        passagem.passar_servico_modal = {active: false}
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
              vmIdx.listCtrl.list.splice(vmIdx.listCtrl.list.indexOf(passagem), 1)
            }, function(response) {

            }
          )
        },
        duplicarRegistro: function(passagem) {
          novaPassagem = angular.copy(passagem)
          delete novaPassagem.id
          delete novaPassagem.quem_entra
          delete novaPassagem.quem_sai
          delete novaPassagem.senha_quem_entra
          delete novaPassagem.senha_quem_sai
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
