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

    vmIdx.init = function(){
      vmIdx.formFactory = new formFactory() //instanciando a factory..
      vmIdx.formFactory.lista = vmIdx.listaPessoas
    }

    vmIdx.listaPessoas = [
      { id: 1, tipo: [], sexo: 'm', deficiente: false, nome: 'Igor Santos',
        cpf: '000.000.000-01', nasc: '07/01/2010', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214', tipo: 'Pagador', juridica: false, sexo: 'm',
        rg: '6165357', prof: 'Estudante', iden: 25, emailalt: 'igorsantos@gmail.com',
        enderecos: [
          { id: 1, principal: true, titulo: 'Casa', cep: '74370577', cidade: 'Goiânia',
            logradouro: 'Rua Maria Luiz', complemento: 'Quadra 7, Lote 10', bairro: 'Setor Central'
          },
          { id: 2, principal: false, titulo: 'Trabaio', cep: '740000', cidade: 'Goiânia',
            logradouro: 'Rua 84', complemento: 'Centro Comercial ANtonio JOão Sebba', bairro: 'Setor Sul'
          }
        ], contas: []
      },
      { id: 2, tipo: [], sexo: 'f', deficiente: false, nome: 'Luciana Pereira',
        cpf: '000.000.000-01', nasc: '07/02/2010', email: 'igor@seucondominio.com.br',
        telefone: '(62) 9 9674-5214',
        enderecos: [
          { id: 1, principal: true, titulo: 'Casa', cep: '74370577', cidade: 'Goiânia',
            logradouro: 'Rua Maria Luiz', complemento: 'Quadra 7, Lote 10', bairro: 'Setor Central'
          },
          { id: 2, principal: false, titulo: 'Trabaio', cep: '740000', cidade: 'Goiânia',
            logradouro: 'Rua 84', complemento: 'Centro Comercial ANtonio JOão Sebba', bairro: 'Setor Sul'
          }
        ]
      },
      { id: 3, tipo: [], sexo: 'm', deficiente: false, nome: 'Fernando Luiz',
        cpf: '000.000.000-01', nasc: '07/03/2010', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214',
        enderecos: [
          { id: 1, principal: true, titulo: 'Casa', cep: '74370577', cidade: 'Goiânia',
            logradouro: 'Rua Maria Luiz', complemento: 'Quadra 7, Lote 10', bairro: 'Setor Central'
          },
          { id: 2, principal: false, titulo: 'Trabaio', cep: '740000', cidade: 'Goiânia',
            logradouro: 'Rua 84', complemento: 'Centro Comercial ANtonio JOão Sebba', bairro: 'Setor Sul'
          }
        ]
      },
      { id: 4, tipo: [], sexo: 'm', deficiente: false, nome: 'Michael Jackson',
        cpf: '000.000.000-01', nasc: '07/04/2010', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214',
        enderecos: [
          { id: 1, principal: true, titulo: 'Casa', cep: '74370577', cidade: 'Goiânia',
            logradouro: 'Rua Maria Luiz', complemento: 'Quadra 7, Lote 10', bairro: 'Setor Central'
          },
          { id: 2, principal: false, titulo: 'Trabaio', cep: '740000', cidade: 'Goiânia',
            logradouro: 'Rua 84', complemento: 'Centro Comercial ANtonio JOão Sebba', bairro: 'Setor Sul'
          }
        ]
      }
    ]

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


    // settings = {
    //   contas: [
    //   opcoes: [
    //   ]
    // }

    // filtro = {
    //   avancado: false,
    //   params: []

    //   opcoes: [
    //   ]

    //   open: {

    //   }
    //   close: {

    //   }

    //   exec: function{
    //     listCtrl.buscar()
    //   }
    // }

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
              vmIdx.listaPessoas.splice(vmIdx.listaPessoas.indexOf(pessoa), 1)
            }
          }
        ]
      })
    }

    vmIdx.avancado = false;

    return vmIdx

  }
])
