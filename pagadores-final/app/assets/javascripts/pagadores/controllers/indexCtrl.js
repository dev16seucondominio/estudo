angular.module("pagadoresApp").lazy
.controller("PessoasCtrl", [
  "formFactory", "indexFactory", "scAlert", "scTopMessages", "Templates", "Pagador", function(formFactory, indexFactory, scAlert, scTopMessages, Templates, Pagador) {
    vmIdx = this

    vmIdx.templates = Templates

    vmIdx.formFactory = undefined

    vmIdx.init = function(pessoa){
      vmIdx.formFactory = new formFactory()
      vmIdx.indexFactory = new indexFactory()
      vmIdx.listCtrl.init(pessoa)
      vmIdx.indexFactory.handleList = handleList
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
            console.log(data)
            if (vmIdx.listCtrl.with_settings) {
              vmIdx.listCtrl.with_settings = false
              loadSettings(data)
            }
            vmIdx.listCtrl.list = angular.copy(data.list)
            vmIdx.formFactory.lista = vmIdx.listCtrl.list
          }
        )
      },
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
                vmIdx.listCtrl.execExcluirRegistro(pessoa)
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
          // if (pessoa.enderecos.length > 0) {
          //   console.log('Pessoa com endereço: ',pessoa)
          //   return pessoa
          // } //filter:PessoasCtrl.filtro.opcoes.comEndereco
        }
      }
    }

    handleList = function(list) {
      list = [list].flattenCompact()

      for (var i = 0; i < list.length; i++) {
        item = list[i]

        itemPessoa = vmIdx.listCtrl.list.getById(item.id)
        if (!itemPessoa){ continue }

        item.carregado = true

        if (item.nasc) { item.nasc = new Date(item.nasc) }
        if (item.reajuste_contratual) {
          item.reajuste_contratual.ultimo_reajuste = new Date(item.reajuste_contratual.ultimo_reajuste)
        }
        angular.extend(itemPessoa, item)
      }
    }

    // Settings

    loadSettings = function(data){
      vmIdx.settings = data.settings
      vmIdx.indexFactory.settings = vmIdx.settings
      // vmIdx.locale = data.locales.pagadores
      // vmIdx.localeContas = data.locales.contas
    }

    return vmIdx

  }
])