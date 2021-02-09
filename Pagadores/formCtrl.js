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

    vm.tipoConta = [
      {id: 0, key: 'conta_corrente', label: 'Conta Corrente'},
      {id: 1, key: 'poupanca', label: 'Poupança'},
      {id: 2, key: 'conta_investimento', label: 'Conta Investimento'},
      {id: 3, key: 'conta_investimento_2', label: 'Conta Investimento 2'},
      {id: 4, key: 'conta_investimento_3', label: 'Conta Investimento 3'},
      {id: 5, key: 'conta_investimento_4', label: 'Conta Investimento 4'},
      {id: 6, key: 'conta_investimento_5', label: 'Conta Investimento 5'},
      {id: 7, key: 'conta_investimento_6', label: 'Conta Investimento 6'},
      {id: 8, key: 'fundo_de_reserva', label: 'Fundo de Reserva'},
      {id: 9, key: 'quotas_de_capital', label: 'Quotas de Capital'},
      {id: 10, key: 'ferias_decimo_terceiro', label: '13° Férias'},
      {id: 11, key: 'fundo_de_eventos', label: 'Fundo de Eventos'},
      {id: 12, key: 'fundo_de_obras', label: 'Fundo de Obras'},
      {id: 13, key: 'f_reserva_compesa', label: 'Fundo de Reserva Compesa'}
    ]

    vm.correcao = [
      {id: 0, key: 'inpc_ibge', label: 'INPC (IBGE)'},
      {id: 1, key: 'igp_di_fgv', label: 'IGP-DI (FGV) - BR'},
      {id: 2, key: 'ipa_m_fgv', label: 'IPA-M (FGV) - BR'},
      {id: 3, key: 'ipa_di_fgv', label: 'IPA-DI (FGV) - BR'},
      {id: 4, key: 'incc_m_fgv', label: 'INCC-M (FGV) - BR'},
      {id: 5, key: 'incc_di_fgv', label: 'INCC-DI (FGV) - BR'},
      {id: 6, key: 'tj_mg_tjmg', label: 'TJ-MG (TJMG) - BR'},
      {id: 7, key: 'poupanca_br', label: 'Poupança - BR'},
      {id: 8, key: 'ipc_di_fgv', label: 'IPC-DI (FGV) - BR'},
      {id: 9, key: 'salario_minimo', label: 'Salário Mínimo - BR'},
      {id: 10, key: 'encoge_718n', label: 'ENCOGE (JEBR0718N) - BR'},
      {id: 11, key: 'encoge_719n', label: 'ENCOG (JEBR0719N) - BR'},
      {id: 12, key: 'encoge_620n', label: 'ENCOGE (JEBR0620N) - BR'},
      {id: 13, key: 'tj_sp_tjsp', label: 'TJ-SP (TJSP) - BR'},
      {id: 14, key: 'encoge_820n', label: 'ENCONGE (JEBR0820N) - BR'},
      {id: 15, key: 'igp_m_fgv', label: 'IGP-M (FGV) - BR'}
    ]

    vm.periodos = [
      {id: 0, key: 'dias', label: 'Dias', default: false},
      {id: 1, key: 'meses', label: 'Meses', default: true},
      {id: 2, key: 'Anos', label: 'Anos', default: true}
    ]

    vm.anexos = [
      {id:0, key: 'fotos', label: 'Fotos'},
      {id:1, key: 'documentos', label: 'Documentos'}
    ]

    vm.enderecos = [
      // {
      //   id: 1,
      //   principal: true,
      //   titulo: 'Casa',
      //   cep: '74370577',
      //   cidade: 'Goiânia - GO - Brasil',
      //   logradouro: 'Rua Aulina Luiz',
      //   complemento: 'Q.7 L.1',
      //   bairro: 'Setor Santa Rita',
      // }
    ]

    vm.contasBanc = []

    vm.formEnd = {
      add: function() {
        vm.enderecos.push({id: (vm.enderecos.length) + 1})
      },
      rmv: function(end) {
        vm.enderecos.remove(end)
      }
    }

    vm.formConta = {
      add: function() {
        vm.contasBanc.push({id: (vm.contasBanc.length) + 1})
      },
      rmv: function(conta) {
        vm.contasBanc.remove(conta)
      }
    }

    vm.reajuste = true

    vm

  }
])
