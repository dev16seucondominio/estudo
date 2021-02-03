myapp = angular.module("myapp", ["sc.app.helpers"])
myapp.run([
  '$rootScope', 'scAlert', 'scTopMessages', function($rootScope, scAlert, scTopMessages) {
    $rootScope.scAlert = scAlert;
    $rootScope.scTopMessages = scTopMessages;
  }
]);
myapp.controller("TestCtrl", [
  "$scope", "scAlert", "scTopMessages", function(s, scAlert, scTopMessages) {

    s.listaPessoas = [
        { id: 0, key: 'p_um', nome: 'Igor Santos', cpf: '000.000.000-01', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579'},
        { id: 1, key: 'p_dois', nome: 'Luciana Antedeguemon', cpf: '000.000.000-01', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' },
        { id: 2, key: 'p_tres', nome: 'Fernando Luiz', cpf: '000.000.000-01', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' },
        { id: 3, key: 'p_quatro', nome: 'Michael Jackson', cpf: '000.000.000-01', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' },
        { id: 4, key: 'p_cinco', nome: 'Guilherme Lucas', cpf: '000.000.000-01', telefone: '(62) 9 9674-5214', endereco: 'Rua Maria João, 115, Goiânia, Goiás-GO, 74590579' }
    ]

    // alert
    s.alert = function() {
      scAlert.open({
        title: 'O que é isso?',
        messages: ['Se você acha que isso é um alerta clique em OK!', 'Só existe essa opção, então clica logo :P'],
        buttons: [
          {
            label: 'OK',
            color: 'green'
          }
        ]
      });
    };
    s.confirm = function() {
      scAlert.open({
        title: 'Você tem certeza?',
        messages: 'Você não será capaz de recuperar esse registro!',
        buttons: [
          {
            label: 'Cancelar',
            color: 'gray'
          }, {
            label: 'Excluír',
            color: 'red',
            action: function() {
              scTopMessages.openSuccess("Registro excluído com sucesso!");
            }
          }
        ]
      });
    };

    // top messages

    s.topMessages = {
      sucess: function() {
        scTopMessages.openSuccess("Parabéns!");
      },
      danger: function() {
        scTopMessages.openDanger("Perigo!");
      },
      warning: function(){
        scTopMessages.openWarning("Cuidado!");
      }
    }
  }
]);

