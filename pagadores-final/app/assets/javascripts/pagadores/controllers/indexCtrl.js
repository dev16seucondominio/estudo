angular.module("pagadoresApp").lazy
.controller("PessoasCtrl", [
  "formFactory", "scAlert", "scTopMessages", "Templates", function(formFactory, scAlert, scTopMessages, Templates) {
    vmIdx = this

    // vmIdx.templates.pagadores.show .... bate no arquivo html do show
    vmIdx.templates = Templates;

    vmIdx.formFactory = undefined;

    vmIdx.init = function(pessoa){
      vmIdx.formFactory = new formFactory() //instanciando a factory..
      vmIdx.formFactory.lista = vmIdx.pessoas.listaPessoas
      vmIdx.filtro.listar = angular.copy(vmIdx.settings.filtro.default)
    }

    vmIdx.pessoas = {
      listaPessoas: [
      { id: 1, sexo: 'm', deficiente: false, nome: 'Igor Santos',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: false, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'Lindo d+ nosa sem hora', enderecos: [{principal: true, id: 1}, {principal: false, id: 2}], contas: [], perfilPagamento: {} },
      { id: 2, sexo: 'm', deficiente: false, nome: 'Lucas Santos',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: false, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'Lindo d+ nosa sem hora', enderecos: [{principal: true, id: 1}, {principal: false, id: 2}], contas: [], perfilPagamento: {} },
      { id: 3, sexo: 'm', deficiente: false, nome: 'Erick Silva',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: false, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'Lindo d+ nosa sem hora', enderecos: [], contas: [], perfilPagamento: {} },
      { id: 4, sexo: 'm', deficiente: false, nome: 'Amanda Pereira',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: false, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'Lindo d+ nosa sem hora', enderecos: [], contas: [], perfilPagamento: {} },
      { id: 5, sexo: 'm', deficiente: false, nome: 'Jessica Ferreira',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: false, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'Lindo d+ nosa sem hora', enderecos: [], contas: [], perfilPagamento: {} },
      { id: 6, sexo: 'm', deficiente: false, nome: 'Pedro Santos',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: false, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'Lindo d+ nosa sem hora', enderecos: [], contas: [], perfilPagamento: {} },
      { id: 7, sexo: 'm', deficiente: false, nome: 'Ítalo Santos',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: true, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'Lindo d+ nosa sem hora', enderecos: [], contas: [], perfilPagamento: {} },
      { id: 8, nome: 'Thamires Laissa',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Fornecedor', juridica: true, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'Lindo d+ nosa sem hora', enderecos: [], contas: [], perfilPagamento: {} },
      { id: 9, sexo: 'm', deficiente: false, nome: 'Diogo João',
        doc: '00000000001', nasc: '', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: true, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        obs: 'aaaaaa', enderecos: [], contas: [], perfilPagamento: {} }
      ],
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
