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
    }

    vmIdx.listCtrl = {
      carregando: false,
      list: [],
      init: function(){
        params = {}
        this.exec(params)
      },
      exec: function(params) {
        this.carregando = false;
        return Pagador.list(params, (function(_this) {
          return function(data, resp, arg) {
            vmIdx.listCtrl.list = angular.extend(data.list)
            vmIdx.formFactory.lista = vmIdx.listCtrl.list
            return _this.carregando = false
          }
        })(this))
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
                scTopMessages.openSuccess("Registro excluído com sucesso!", {timeOut: 3000})
                vmIdx.pessoas.listaPessoas.splice(vmIdx.pessoas.listaPessoas.indexOf(pessoa), 1)
              }
            }
          ]
        })
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
        this.listar = {}
        if(tipo == 'simples') {
          this.params.q ? this.listar = this.params.q : this.listar = angular.copy(this.params)
          this.preenchido = true
        }
        if(tipo == 'avancado') {
          delete(this.params.q)
          this.listar = angular.copy(this.params)
          vmIdx.settings.filtro.avancado = false
          this.preenchido = true
        }
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

    return vmIdx

  }
])
