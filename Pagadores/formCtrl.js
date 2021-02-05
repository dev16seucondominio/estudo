pagadoresFinanc.controller("formularioCtrl", [
  "$scope",function(s) {

    vm = this

    vm.operacoes = [
      {id: 1, key: 'pix', label: 'Pix'},
      {id: 2, key: 'boleto_titulo', label: 'Boleto - Título'},
      {id: 3, key: 'boleto_convenio', label: 'Boleto - Convênio'},
      {id: 4, key: 'cheque', label: 'Cheque'},
      {id: 5, key: 'deposito', label: 'Depósito'},
      {id: 6, key: 'saque', label: 'Saque'},
      {id: 7, key: 'cartao_credito', label: 'Cartão Crédito'},
      {id: 8, key: 'cartao_debito', label: 'Cartão Débito'},
      {id: 9, key: 'debito_automatico', label: 'Débito Automático'},
      {id: 10, key: 'tarifa', label: 'Tarifa'},
      {id: 11, key: 'dinheiro', label: 'Dinheiro'},
      {id: 12, key: 'rendimento', label: 'Rendimento'},
      {id: 13, key: 'aplicacao', label: 'Aplicação'},
      {id: 14, key: 'pagamento_eletronico', label: 'Pagamento Eletrônico'},
      {id: 15, key: 'resgate', label: 'Resgate'},
      {id: 16, key: 'tranferencia_ted', label: 'Tranferência - TED'},
      {id: 17, key: 'tranferencia_doc', label: 'Tranferência - DOC'},
      {id: 18, key: 'tranferencia_mesmo_banco', label: 'Tranferência - MESMO BANCO'}
    ]

    vm.planoDeContas = [
      {id: 0, key: 'receitas', label: '1 - RECEITAS'},
      {id: 1, key: 'receitas_ordinarias', label: '1.1 - RECEITAS ORDINÁRIAS'},
      {id: 2, key: 'taxa_de_condominio', label: '1.1.1 - Taxa de Condomínio'},
      {id: 3, key: 'despesas', label: '2 - DESPESAS'},
      {id: 4, key: 'despesas_trabalhistas', label: '2.1 - DESPESAS TRABALHISTAS'},
      {id: 5, key: 'salarios', label: '2.1.1 - Salários'}
    ]

    vm.fundo = [
      {id: 0, key: 'caixa', label: '1 - CAIXA'},
      {id: 1, key: 'fundo_de_reserva', label: '2 - FUNDO DE RESERVA'},
      {id: 2, key: 'fundo_de_obras', label: '3 - FUNDO DE OBRAS'},
      {id: 3, key: 'fundo_trabalhista', label: '4 - FUNDO TRABALHISTA'}
    ]

    vm.banco = [
      {id: 0, key: 'caixa', label: '104 - Caixa Econômica Federal'},
      {id: 1, key: 'inter', label: '077 - Banco Inter'},
      {id: 2, key: 'bradesco', label: '237 - Bradesco'},
      {id: 3, key: 'banco_do_brasil', label: '001 - Banco do Brasil'}
    ]

    vm
  }
])
