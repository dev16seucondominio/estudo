angular.module("passagensApp").lazy
.controller("PassagensCtrl", [
  "formFactory", "indexFactory", "scAlert", "scTopMessages", "Templates", "Passagem", 
    function(formFactory, indexFactory, scAlert, scTopMessages, Templates, Passagem) {
      vmIdx = this

      vmIdx.templates = Templates

      vmIdx.formFactory  = undefined
      vmIdx.indexFactory = undefined

      vmIdx.init = function(pessoa){
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
              if (vmIdx.listCtrl.with_settings) {
                vmIdx.listCtrl.with_settings = false
                loadSettings(data)
              }
              vmIdx.listCtrl.list = angular.copy(data.list)
            }
          )
        },
        alertExcluirRegistro: function(pessoa) {
          scAlert.open({
            title: 'Você tem certeza que deseja excluir essa pessoa?',
            messages: 'Todos os dados serão perdidos!',
            buttons: [
              {
                label: 'Não',
                color: 'gray'
              }, {
                label: 'Sim',
                color: 'yellow',
                action: function() {
                  vmIdx.listCtrl.execExcluirRegistro(pessoa)
                }
              }
            ]
          })
        },
        execExcluirRegistro: function(pessoa){
          Passagem.destroy(pessoa,
            function(data){
              scTopMessages.openSuccess(data.msg, {timeOut: 3000})
              vmIdx.listCtrl.list.splice(vmIdx.listCtrl.list.indexOf(pessoa), 1)
            }, function(response){
              scTopMessages.openDanger(response.data.errors, {timeOut: 3000})
            }
          )
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
        },
        togglePf: function() {
          this.params.juridica = false
        },
        togglePj: function() {
          this.params.juridica = true
        },
        buscarTipo: function(tipo) {
          this.params.tipo = tipo
        },
        setOpcoes: function(opcao) {
          opcao.active = !opcao.active
          this.params.opcoes.toggle(opcao.key)
          console.log(this.params.opcoes)
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

            itemPessoa = this.get(item)
            if (!itemPessoa){
              if (opts.unshift_if_new){
                vmIdx.listCtrl.list.unshift(item)
              }
              continue
            }

            item.carregado = true

            if (item.nasc) { item.nasc = new Date(item.nasc) }
            if (item.reajuste_contratual) {
              item.reajuste_contratual.ultimo_reajuste = new Date(item.reajuste_contratual.ultimo_reajuste)
            }

            angular.extend(itemPessoa, item)
          }
        }
      }

      loadSettings = function(data){
        vmIdx.settings = data.settings
        vmIdx.indexFactory.settings = vmIdx.settings

        vmIdx.filtro.init()
      }

      return vmIdx

    }
  ]
)


