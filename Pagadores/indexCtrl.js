pagadoresFinanc = angular.module("pagadoresFinanc", ["sc.app.helpers"])
pagadoresFinanc.run([
  '$rootScope', function($rootScope) {
  }
])
pagadoresFinanc.controller("indexCtrl", [
  "$scope", function(s) {
    vm = this

    vm.listaPessoas = [
      { id: 0, key: 'p_um', nome: 'Igor Santos', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579'},
      { id: 1, key: 'p_dois', nome: 'Luciana Antedeguemon', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' },
      { id: 2, key: 'p_tres', nome: 'Fernando Luiz', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' },
      { id: 3, key: 'p_quatro', nome: 'Michael Jackson', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' },
      { id: 4, key: 'p_cinco', nome: 'Guilherme Lucas', cpf: '000.000.000-01', nascimento: '10/10/2010', email: 'teste@seucondominio.com.br', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' }
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

    vm.scBorder = { color: 'red', position: '', type: 'solid', size: 'md' }

    vm.badgeIcon = [
      { icon: 'sc-icon-cadeado-aberto', color: 'green' },
      { icon: 'sc-icon-carta-2', color: 'green' },
      { icon: 'sc-icon-cafe', color: 'green' },
      { icon: 'sc-icon-exclamacao-3', color: 'green' },
      { icon: 'sc-icon-estrela', color: 'green' }
    ]

    vm.corIntensidade = ['-lighter', '-light', '', '-dark', '-darker'];

    vm.cores = ['blue', 'cian', 'green', 'red', 'yellow', 'gray']

    vm.listaBdg = [
      { id: 0, key: 'bdg_um', color: 'green', intensidade: '-lighter'},
      { id: 1, key: 'bdg_dois', color: 'green', intensidade: '-light'},
      { id: 2, key: 'bdg_tres', color: 'green', intensidade: ''},
      { id: 3, key: 'bdg_quatro', color: 'green', intensidade: '-dark'},
      { id: 4, key: 'bdg_cinco', color: 'green', intensidade: '-darker'}
    ]

    vm.listaAlign = [
      { id: 0, key: 'align_um', posicao: 'align-left', },
      { id: 1, key: 'align_dois', posicao: 'align-center',},
      { id: 2, key: 'align_tres', posicao: 'align-right',},
      { id: 3, key: 'align_quatro', posicao: 'align-justify',}
    ]

    vm.listaCoresBg = ['red-lighter', 'red-light', 'red', 'red-dark', 'red-darker']

    vm.scSides = ["", "-t", "-b", "-l", "-r", "-h", "-v"]

    vm.changeColorAcc = function(cor) {
      for(let i=0; i < vm.listaAcc.length; i++) {
        vm.listaAcc[i].color = cor
      }
    }

    vm.init = function() {

    }

    vm.exibirForm = false
    vm.avancado = false

    vm.changeColorBdg = function(cor) {
      for(let i=0; i < vm.badgeIcon.length; i++) {
        vm.badgeIcon[i].color = cor
      }
    }

    vm

  }
])
