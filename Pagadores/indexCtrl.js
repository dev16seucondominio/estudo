pagadoresFinanc = angular.module("pagadoresFinanc", ["sc.app.helpers"])
pagadoresFinanc.run([
  '$rootScope', function($rootScope) {
  }
])
pagadoresFinanc.controller("indexCtrl", [
  "$scope", function(s) {
    vm = this

    vm.listaPessoas = [
      { id: 0, key: 'p_um', nome: 'Igor Santos', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: ''},
      { id: 1, key: 'p_dois', nome: 'Luciana Antedeguemon', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' },
      { id: 2, key: 'p_tres', nome: 'Fernando Luiz', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' },
      { id: 3, key: 'p_quatro', nome: 'Michael Jackson', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' },
      { id: 4, key: 'p_cinco', nome: 'Ednaldo Pereira', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' },
      { id: 5, key: 'p_seis', nome: 'José Augusto', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' },
      { id: 6, key: 'p_sete', nome: 'Lucas Santos', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' },
      { id: 7, key: 'p_oito', nome: 'Douglas Santos', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' },
      { id: 8, key: 'p_nove', nome: 'Amanda Ribeiro', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' },
      { id: 9, key: 'p_dez', nome: 'Leonardo Medeiros', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' }
    ]

    vm.filtro = [
      {opcao: 'Com endereço'},
      {opcao: 'Sem endereço'},
      {opcao: 'Endereço completo'},
      {opcao: 'Endereço Incompleto'},
      {opcao: 'Sem CPF/CNPJ'},
      {opcao: 'Com CPF/CNPJ'},
      {opcao: 'Sem bloqueio inadimplente'},
      {opcao: 'Com bloqueio inadimplente'},
      {opcao: 'Sem emails'},
      {opcao: 'Com emails'}
    ]

    vm.buscar = {
      pesquisa: '',
      listar: '',
      filtrar: function() {
        this.listar = this.pesquisa
      },
      nome: '',
      documento: '',
      telefone: '',
      email: ''
      buscaAvancada: function() {

      }
    }

    vm.exibirForm = false
    vm.avancado = false

    vm

  }
])
