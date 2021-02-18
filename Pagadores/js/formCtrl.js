pagadoresFinanc.controller("formularioCtrl", [
  "formFactory", "scAlert", "scTopMessages", function(formFactory, scAlert, scTopMessages) {
    vmForm = this

    vmForm.carregandoData = false

    vmForm.init = function(baseFact, pessoa){
      console.log('estou iniciando com pessoa:', pessoa)
      if(pessoa) {
        vmForm.params = angular.copy(pessoa)
        vmForm.params.nasc = new Date(vmForm.params.nasc)
      } else {
        vmForm.params = {}
        vmForm.params.enderecos = []
        vmForm.params.contas = []
        vmForm.params.perfilPag = {}

      }
      vmForm.formFactory = baseFact
      console.log('fim init, params:', vmForm.params)
    }

    vmForm.perfilPagamento = {
      operacoes: [
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
      ],
      listPlano: [
        {id: 0, key: 'receitas', nome: '1 - RECEITAS'},
        {id: 1, key: 'receitas_ordinarias', nome: '1.1 - RECEITAS ORDINÁRIAS'},
        {id: 2, key: 'taxa_de_condominio', nome: '1.1.1 - Taxa de Condomínio'},
        {id: 3, key: 'despesas', nome: '2 - DESPESAS'},
        {id: 4, key: 'despesas_trabalhistas', nome: '2.1 - DESPESAS TRABALHISTAS'},
        {id: 5, key: 'salarios', nome: '2.1.1 - Salários'}
      ],
      listFundo: [
        {id: 0, key: 'caixa', nome: '1 - CAIXA'},
        {id: 1, key: 'fundo_de_reserva', nome: '2 - FUNDO DE RESERVA'},
        {id: 2, key: 'fundo_de_obras', nome: '3 - FUNDO DE OBRAS'},
        {id: 3, key: 'fundo_trabalhista', nome: '4 - FUNDO TRABALHISTA'}
      ],
      setPlano: function(planoDeContas) {
        vmForm.params.perfilPag.plano = planoDeContas
      },
      setFundo: function(fundo) {
        vmForm.params.perfilPag.fundo = fundo
      }
    }

    vmForm.contasBancarias = {
      listBancos: [
        {id: 0, key: 'caixa', nome: '104 - Caixa Econômica Federal'},
        {id: 1, key: 'inter', nome: '077 - Banco Inter'},
        {id: 2, key: 'bradesco', nome: '237 - Bradesco'},
        {id: 3, key: 'banco_do_brasil', nome: '001 - Banco do Brasil'}
      ],
      tiposConta: [
        {id: 0, key: 'conta_corrente', nome: 'Conta Corrente'},
        {id: 1, key: 'poupanca', nome: 'Poupança'},
        {id: 2, key: 'conta_investimento', nome: 'Conta Investimento'},
        {id: 3, key: 'conta_investimento_2', nome: 'Conta Investimento 2'},
        {id: 4, key: 'conta_investimento_3', nome: 'Conta Investimento 3'},
        {id: 5, key: 'conta_investimento_4', nome: 'Conta Investimento 4'},
        {id: 6, key: 'conta_investimento_5', nome: 'Conta Investimento 5'},
        {id: 7, key: 'conta_investimento_6', nome: 'Conta Investimento 6'},
        {id: 8, key: 'fundo_de_reserva', nome: 'Fundo de Reserva'},
        {id: 9, key: 'quotas_de_capital', nome: 'Quotas de Capital'},
        {id: 10, key: 'ferias_decimo_terceiro', nome: '13° Férias'},
        {id: 11, key: 'fundo_de_eventos', nome: 'Fundo de Eventos'},
        {id: 12, key: 'fundo_de_obras', nome: 'Fundo de Obras'},
        {id: 13, key: 'f_reserva_compesa', nome: 'Fundo de Reserva Compesa'}
      ],
      setBanco: function(banco, conta) {
        conta.banco = banco
      },
    }

    vmForm.correcao = [
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

    vmForm.periodos = [
      {id: 0, key: 'dias', label: 'Dias', default: false},
      {id: 1, key: 'meses', label: 'Meses', default: true},
      {id: 2, key: 'Anos', label: 'Anos', default: true}
    ]

    vmForm.anexos = [
      {id:0, key: 'fotos', label: 'Fotos'},
      {id:1, key: 'documentos', label: 'Documentos'}
    ]

    vmForm.formEnd = {
      add: function() {
        vmForm.params.enderecos.push({id: (vmForm.params.enderecos.length) + 1})
      },
      rmv: function(end) {
        vmForm.params.enderecos.remove(end)
      }
    }

    vmForm.formConta = {
      add: function() {
        if(vmForm.params.cpf) {
          vmForm.params.contas.push({
            id: (vmForm.params.contas.length) + 1,
            banco: vmForm.params.contas.banco,
            nome: (angular.copy(vmForm.params.nome)),
            doc: (angular.copy(vmForm.params.cpf))
          })
        } else {
            vmForm.params.contas.push({id: (vmForm.params.contas.length) + 1, nome: (angular.copy(vmForm.params.nome)) })
        }
      },
      rmv: function(conta) {
        vmForm.params.contas.remove(conta)
      },
      setContaPrincipal: function(conta) {
        conta.principal = vmForm.params.contas.filter(conta => (conta.principal))
      }
    }

    vmForm.formCadastro = {
      salvar: function(pessoa) {
        if(!vmForm.params.nome) {
          scTopMessages.openDanger("Nome não pode ser vazio!", {timeOut: 3000})
          vmForm.erroNome = true
        } else {
            if(!vmForm.params.id) {
              console.log('Adicionando Novo')
              vmForm.params.id = vmForm.formFactory.lista.length + 1
              vmForm.formFactory.lista.unshift(vmForm.params)
              vmForm.formFactory.close()
            } else {
                console.log('Editando')
                vmForm.formFactory.lista.splice(vmForm.formFactory.lista.indexOf(pessoa), 1, vmForm.params)
                vmForm.params.acc.opened = true
                vmForm.params.editing = false
                vmForm.formFactory.close()
              }
          }
      }
    }


    vmForm.reajuste = true

    return vmForm

  }
])
