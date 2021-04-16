angular.module("pagadoresApp").lazy
.controller("PessoasCtrl", [
  "formFactory", "indexFactory", "scAlert", "scTopMessages", "Templates", "Pagador", function(formFactory, indexFactory, scAlert, scTopMessages, Templates, Pagador) {
    vmIdx = this

    vmIdx.templates = Templates

    vmIdx.formFactory = undefined

    vmIdx.init = function(pessoa){
      vmIdx.formFactory = new formFactory()
      vmIdx.indexFactory = new indexFactory()
      vmIdx.listCtrl.init()
      vmIdx.indexFactory.handleList = handleList
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

        Pagador.list(params,
          function(data) {
            if (vmIdx.listCtrl.with_settings) {
              vmIdx.listCtrl.with_settings = false
              loadSettings(data)
            }
            vmIdx.listCtrl.list = angular.copy(data.list)
            vmIdx.formFactory.lista = vmIdx.listCtrl.list
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
        this.params = {opcoes}
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
      setOpcoes: function(opcao) {
        console.log(opcao)
        opcao.active = !opcao.active
        this.params.opcoes.push(opcao.id)

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
        // Setar o endereço principal para o show
        item.endereco_principal = item.enderecos.find(end => (end.principal))
        // Pegar o nome do banco da lista de configurações e coloca-lo no show
        getBancoNome(item)

        angular.extend(itemPessoa, item)
      }
    }

    getBancoNome = function(pessoa) {
      for (var j = 0; j < pessoa.contas.length; j++) {
        for (var i = 0; i < vmIdx.settings.pagadores.bancos.length; i++) {
          itemBanco = vmIdx.settings.pagadores.bancos.getById(pessoa.contas[j].banco_id)
          if (!itemBanco){ continue }
          pessoa.contas[j].banco_nome = itemBanco.nome
        }
      }
    }

    // Settings
    loadSettings = function(data){
      vmIdx.settings = data.settings
      vmIdx.indexFactory.settings = vmIdx.settings
      vmIdx.filtro.params = vmIdx.settings.pagadores.filtro
      // vmIdx.locale = data.locales.pagadores
      // vmIdx.localeContas = data.locales.contas
    }

    return vmIdx

  }
])
