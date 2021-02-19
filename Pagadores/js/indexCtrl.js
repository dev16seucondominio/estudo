pagadoresFinanc = angular.module("pagadoresFinanc", ["sc.app.helpers"])
pagadoresFinanc.run([
  '$rootScope', 'scAlert', 'scTopMessages', function($rootScope, scAlert, scTopMessages) {
    $rootScope.scAlert = scAlert;
    $rootScope.scTopMessages = scTopMessages;
  }
])
pagadoresFinanc.controller("PessoasIndexCtrl", [
  "formFactory", "scAlert", "scTopMessages", function(formFactory, scAlert, scTopMessages) {
    vmIdx = this

    vmIdx.formFactory = undefined

    vmIdx.init = function(pessoa){
      vmIdx.formFactory = new formFactory() //instanciando a factory..
      vmIdx.formFactory.lista = vmIdx.pessoa.listaPessoas
    }

    vmIdx.pessoa = {
      listaPessoas: [
      { id: 1, tipo: [], sexo: 'm', deficiente: false, nome: 'Igor Santos',
        doc: '000.000.000-01', nasc: '07/01/2010', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: false, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        enderecos: [], contas: [], perfilPagamento: {} }
      ]
    }



    vmIdx.OpcoesAvanc = [
      {label: 'Com endereço'},
      {label: 'Sem endereço'},
      {label: 'Endereço completo'},
      {label: 'Endereço Incompleto'},
      {label: 'Sem CPF/CNPJ'},
      {label: 'Com CPF/CNPJ'},
      {label: 'Sem bloqueio inadimplente'},
      {label: 'Com bloqueio inadimplente'},
      {label: 'Sem emails'},
      {label: 'Com emails'}
    ]

    vmIdx.listar = {}

    vmIdx.buscar = {
      filtroSimples: function() {
        vmIdx.listar = vmIdx.aplicarFiltro
      },
      filtroAvanc: function() {
        vmIdx.listar = vmIdx.aplicarFiltroAvancado
      }
    }

    vmIdx.excluirRegistro = function(pessoa) {
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
              vmIdx.pessoa.listaPessoas.splice(vmIdx.pessoa.listaPessoas.indexOf(pessoa), 1)
            }
          }
        ]
      })
    }

    vmIdx.avancado = false;

    return vmIdx

  }
])
