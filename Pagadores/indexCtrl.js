pagadoresFinanc = angular.module("pagadoresFinanc", ["sc.app.helpers"])

pagadoresFinanc.controller("PessoasIndexCtrl",
  function() {
    vmIdx = this

    vmIdx.listaPessoas = [
      { id: 0, tipo: 'Pagador', sexo: 'm', deficiente: false,
        nome: 'Igor Santos', cpf: '000.000.000-01', nascimento: '10/10/2010',
        email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214',
        endereco: [
          { id: 123, principal: true, titulo: 'Casa', cep: '74370577', cidade: 'Goiânia',
            logradouro: 'Rua Maria Luiz', completo: 'Quadra 7, Lote 10', bairro: 'Setor Central'
          },
          { id: 312, principal: false, titulo: 'Trabaio', cep: '740000', cidade: 'Goiânia',
            logradouro: 'Rua 84', completo: 'Centro Comercial ANtonio JOão Sebba', bairro: 'Setor Sul'
          }
        ]
      },
      { id: 1, tipo: 'Pagador', sexo: 'f', deficiente: false, nome: 'Luciana Pereira', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'igor@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: vmIdx.listaEnderecos },
      { id: 2, tipo: 'Pagador', sexo: 'm', deficiente: false, nome: 'Fernando Luiz', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: vmIdx.listaEnderecos},
      { id: 3, tipo: 'Pagador', sexo: 'm', deficiente: false, nome: 'Michael Jackson', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: vmIdx.listaEnderecos}
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

    vmIdx.formCadastro = {
      open: function() {
        this.opened = true
      },

      close: function() {
        this.opened = false
      },

      add: function() {
        vmForm.params ||= {}

        vmIdx.listaPessoas.unshift(
          {
            id: (vmIdx.listaPessoas.length) + 1,
            nome: vmForm.params.nome,
            cpf: vmForm.params.cpf,
            nascimento: vmForm.params.nascimento,
            email: vmForm.params.email,
            telefone: vmForm.params.telefone
          }
        )

        vmIdx.formCadastro.close()
      }
    }

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
    //     adçlfkasdlfasçdlkfjasd
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

    vmIdx

  }
)
