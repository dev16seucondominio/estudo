pagadoresFinanc = angular.module("pagadoresFinanc", ["sc.app.helpers"])

// pagadoresFinanc.config([
//   "ENV",
//   "$locationProvider",
//   "$routeProvider",
//   "$controllerProvider",
//   "$compileProvider",
//   "$filterProvider",
//   "$provide",
//   "$animateProvider",
//   '$sceDelegateProvider',
//   "$httpProvider",
//   '$rootScopeProvider',
//   function(ENV, $locationProvider, $routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $animateProvider, $sceDelegateProvider, $httpProvider, $rootScopeProvider) {

//     app.lazy = {
//       controller: $controllerProvider.register,
//       directive: $compileProvider.directive,
//       filter: $filterProvider.register,
//       factory: $provide.factory,
//       service: $provide.service,
//       animation: $animateProvider.register,
//     }
//   }
// ]);

pagadoresFinanc.controller("PessoasIndexCtrl", ["formFactory",
  function(formFactory) {
    vmIdx = this

    vmIdx.formFactory = undefined

    vmIdx.init = function(){
      vmIdx.formFactory = new formFactory() //instanciando a factory..
      vmIdx.formFactory.lista = vmIdx.listaPessoas
    }

    vmIdx.listaPessoas = [
      { id: 1, tipo: 'Pagador', sexo: 'm', deficiente: false, nome: 'Igor Santos',
        cpf: '000.000.000-01', nasc: '10/10/2010', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214',
        enderecos: [
          { id: 123, principal: true, titulo: 'Casa', cep: '74370577', cidade: 'Goiânia',
            logradouro: 'Rua Maria Luiz', complemento: 'Quadra 7, Lote 10', bairro: 'Setor Central'
          },
          { id: 312, principal: false, titulo: 'Trabaio', cep: '740000', cidade: 'Goiânia',
            logradouro: 'Rua 84', complemento: 'Centro Comercial ANtonio JOão Sebba', bairro: 'Setor Sul'
          }
        ]
      },
      { id: 2, tipo: 'Pagador', sexo: 'f', deficiente: false, nome: 'Luciana Pereira',
        cpf: '000.000.000-01', nasc: '10/10/2010', email: 'igor@seucondominio.com.br',
        telefone: '(62) 9 9674-5214',
        enderecos: [
          { id: 987, principal: true, titulo: 'Casa', cep: '74370577', cidade: 'Goiânia',
            logradouro: 'Rua Maria Luiz', complemento: 'Quadra 7, Lote 10', bairro: 'Setor Central'
          },
          { id: 789, principal: false, titulo: 'Trabaio', cep: '740000', cidade: 'Goiânia',
            logradouro: 'Rua 84', complemento: 'Centro Comercial ANtonio JOão Sebba', bairro: 'Setor Sul'
          }
        ]
      },
      { id: 3, tipo: 'Pagador', sexo: 'm', deficiente: false, nome: 'Fernando Luiz',
        cpf: '000.000.000-01', nasc: '10/10/2010', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214',
        enderecos: [
          { id: 654, principal: true, titulo: 'Casa', cep: '74370577', cidade: 'Goiânia',
            logradouro: 'Rua Maria Luiz', complemento: 'Quadra 7, Lote 10', bairro: 'Setor Central'
          },
          { id: 456, principal: false, titulo: 'Trabaio', cep: '740000', cidade: 'Goiânia',
            logradouro: 'Rua 84', complemento: 'Centro Comercial ANtonio JOão Sebba', bairro: 'Setor Sul'
          }
        ]
      },
      { id: 4, tipo: 'Pagador', sexo: 'm', deficiente: false, nome: 'Michael Jackson',
        cpf: '000.000.000-01', nasc: '10/10/2010', email: 'teste@seucondominio.com.br',
        telefone: '(62) 9 9674-5214',
        enderecos: [
          { id: 147, principal: true, titulo: 'Casa', cep: '74370577', cidade: 'Goiânia',
            logradouro: 'Rua Maria Luiz', complemento: 'Quadra 7, Lote 10', bairro: 'Setor Central'
          },
          { id: 741, principal: false, titulo: 'Trabaio', cep: '740000', cidade: 'Goiânia',
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

    vmIdx.avancado = false;

    return vmIdx

  }
]);
