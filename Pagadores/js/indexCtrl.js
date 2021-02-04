pagadoresFinanc = angular.module("pagadoresFinanc", ["sc.app.helpers"])
  pagadoresFinanc.run([
    '$rootScope', function($rootScope) {
    }
  ])
  pagadoresFinanc.controller("pessoasCtrl", [
    "$scope", function(s) {

      s.listaPessoas = [
        { id: 0, key: 'p_um', nome: 'Igor Santos', cpf: '000.000.000-01', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579'},
        { id: 1, key: 'p_dois', nome: 'Luciana Antedeguemon', cpf: '000.000.000-01', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' },
        { id: 2, key: 'p_tres', nome: 'Fernando Luiz', cpf: '000.000.000-01', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' },
        { id: 3, key: 'p_quatro', nome: 'Michael Jackson', cpf: '000.000.000-01', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' },
        { id: 4, key: 'p_cinco', nome: 'Guilherme Lucas', cpf: '000.000.000-01', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' }
      ]

    	s.listaAcc = [
    		{ id: 0, key: 'acc_um', color: 'green', label_text: 'Accordion 1', intensidade: '-lighter'},
    		{ id: 1, key: 'acc_dois', color: 'green',  label_text: 'Accordion 2', intensidade: '-light' },
    		{ id: 2, key: 'acc_tres', color: 'green', label_text: 'Accordion 3', intensidade: '' },
    		{ id: 3, key: 'acc_quatro', color: 'green', label_text: 'Accordion 4', intensidade: '-dark' },
    		{ id: 4, key: 'acc_cinco', color: 'green', label_text: 'Accordion 5', intensidade: '-darker' }
      ]

      s.scBorder = { color: 'red', position: '', type: 'solid', size: 'md' }

      s.badgeIcon = [
        { icon: 'sc-icon-cadeado-aberto', color: 'green' },
        { icon: 'sc-icon-carta-2', color: 'green' },
        { icon: 'sc-icon-cafe', color: 'green' },
        { icon: 'sc-icon-exclamacao-3', color: 'green' },
        { icon: 'sc-icon-estrela', color: 'green' }
      ]

      s.corIntensidade = ['-lighter', '-light', '', '-dark', '-darker'];

      s.cores = ['blue', 'cian', 'green', 'red', 'yellow', 'gray']

      s.listaBdg = [
        { id: 0, key: 'bdg_um', color: 'green', intensidade: '-lighter'},
        { id: 1, key: 'bdg_dois', color: 'green', intensidade: '-light'},
        { id: 2, key: 'bdg_tres', color: 'green', intensidade: ''},
        { id: 3, key: 'bdg_quatro', color: 'green', intensidade: '-dark'},
        { id: 4, key: 'bdg_cinco', color: 'green', intensidade: '-darker'}
      ]

    	s.listaAlign = [
    		{ id: 0, key: 'align_um', posicao: 'align-left', },
    		{ id: 1, key: 'align_dois', posicao: 'align-center',},
    		{ id: 2, key: 'align_tres', posicao: 'align-right',},
    		{ id: 3, key: 'align_quatro', posicao: 'align-justify',}
    	]

    	s.listaCoresBg = ['red-lighter', 'red-light', 'red', 'red-dark', 'red-darker']

      s.scSides = ["", "-t", "-b", "-l", "-r", "-h", "-v"];

      // s.changeSide = function() {

      // }

      s.changeColorAcc = function(cor) {
        for(let i=0; i < s.listaAcc.length; i++) {
          s.listaAcc[i].color = cor
        }
      }

      s.changeColorBdg = function(cor) {
        for(let i=0; i < s.badgeIcon.length; i++) {
          s.badgeIcon[i].color = cor
        }
      }

    }
])
