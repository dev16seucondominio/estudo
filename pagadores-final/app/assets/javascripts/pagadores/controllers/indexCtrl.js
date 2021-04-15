angular.module("pagadoresApp").lazy
.controller("PessoasCtrl", [
  "formFactory", "scAlert", "scTopMessages", "Templates", "Pagador", function(formFactory, scAlert, scTopMessages, Templates, Pagador) {
    vmIdx = this

    vmIdx.templates = Templates

    vmIdx.formFactory = undefined

    vmIdx.init = function(pagador){
      vmIdx.formFactory = new formFactory()
      vmIdx.filtro.listar = angular.copy(vmIdx.settings.filtro.default)
      vmIdx.listCtrl.init(pagador)
      vmIdx.formFactory.handleList = handleList
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

        Pagador.list(params,
          function(data) {
            if (vmIdx.listCtrl.with_settings) {
              vmIdx.listCtrl.with_settings = false
              loadSettings(data)
            }

            vmIdx.listCtrl.list = angular.extend(data.list)
            vmIdx.formFactory.lista = vmIdx.listCtrl.list
          }, function(response) {
              scTopMessages.openDanger(response.data.errors, {timeOut: 3000})
          }
        )
      }
    }

    vmIdx.pessoas = {
      excluirRegistro: function(pessoa) {
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
                vmIdx.pessoas.execExcluirRegistro(pessoa)
              }
            }
          ]
        })
      },
      execExcluirRegistro: function(pessoa){
        Pagador.destroy(pessoa,
          function(data){
            scTopMessages.openSuccess(data.msg, {timeOut: 3000})
            vmIdx.listCtrl.list.splice(vmIdx.listCtrl.list.indexOf(pessoa), 1)
          }, function(response){
            scTopMessages.openDanger(response.data.errors, {timeOut: 3000})
          }
        )
      }
    }

    vmIdx.settings = {
      filtro: {
        avancado: false,
        default: {},
        listOpcoes: [
          {label: 'Com endereço', active: false, key: 'com_endereco'},
          {label: 'Sem endereço', active: false, key: 'sem_endereco'},
          {label: 'Endereço completo', active: false, key: 'endereco_completo'},
          {label: 'Endereço Incompleto', active: false, key: 'endereco_incompleto'},
          {label: 'Sem CPF/CNPJ', active: false, key: 'sem_documento'},
          {label: 'Com CPF/CNPJ', active: false, key: 'com_documento'},
          {label: 'Sem bloqueio inadimplente', active: false, key: 'sem_bloqueio'},
          {label: 'Com bloqueio inadimplente', active: false, key: 'com_bloqueio'},
          {label: 'Sem emails', active: false, key: 'sem_email'},
          {label: 'Com emails', active: false, key: 'com_email'}
        ]
      },
      loadSettings: function(){
        console.log('Carregando configuracoes...')
      }
    }

    vmIdx.filtro = {
      listar: {},
      params: {},
      exec: function(tipo){
        vmIdx.listCtrl.loadList()
      },
      limpar: function() {
        this.listar = []
        this.params = {}
        this.preenchido = false
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
      opcoes: {
        set: function(opcao) {
          console.log(opcao)
          opcao.active = !opcao.active
          if(opcao.key == 'com_endereco') this.comEndereco()
        },
        comEndereco: function() {
          vmIdx.filtro.listar = vmIdx.pessoas.listaPessoas.filter(pessoa => (pessoa.enderecos.length))
        }
      }
    }

    // Settings

    loadSettings = function(data){
      vmIdx.settings = data.settings
      // vmIdx.locale = data.locales.pagadores
      // vmIdx.localeContas = data.locales.contas
    }

    handleList = function(list) {
      list = [list].flattenCompact()

      for (var i = 0; i < list.length; i++) {
        item = list[i]

        itemPagador = vmIdx.formFactory.lista.getById(item.id)
        if (!itemPagador){ continue }

        item.carregado = true

        if(item.nasc){item.nasc = new Date(item.nasc)}
        if(item.reajuste_contratual){
          item.reajuste_contratual.ultimo_reajuste = new Date(item.reajuste_contratual.ultimo_reajuste)
        }

        angular.extend(itemPagador, item)
      }
    }

    return vmIdx

  }
])
