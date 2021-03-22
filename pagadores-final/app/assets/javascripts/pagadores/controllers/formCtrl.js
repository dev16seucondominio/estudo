angular.module('pagadoresApp').lazy
.controller("PessoasFormCtrl", [
  "formFactory", "scAlert", "scTopMessages", function(formFactory, scAlert, scTopMessages) {
    vmForm = this

    vmForm.carregandoData = false

    vmForm.init = function(baseFact, pessoa){
      console.log('estou iniciando com pessoa:', pessoa)
      if(pessoa) {
        vmForm.params = angular.copy(pessoa)
      } else {
        vmForm.params = {}
        vmForm.params.acc = {opened:false}
        vmForm.params.enderecos = []
        vmForm.params.contas = []
        vmForm.params.juridica = false
        vmForm.params.nasc |= {}
        vmForm.params.perfilPagamento = {}
      }
      vmForm.formFactory = baseFact
      console.log('fim init, params:', vmForm.params)
    }

    vmForm.perfilPagamento = {
      listOperacoes: [
        {id: 1, key: 'pix', nome: 'Pix'},
        {id: 2, key: 'boleto_titulo', nome: 'Boleto - Título'},
        {id: 3, key: 'boleto_convenio', nome: 'Boleto - Convênio'},
        {id: 4, key: 'cheque', nome: 'Cheque'},
        {id: 5, key: 'deposito', nome: 'Depósito'},
        {id: 6, key: 'saque', nome: 'Saque'},
        {id: 7, key: 'cartao_credito', nome: 'Cartão Crédito'},
        {id: 8, key: 'cartao_debito', nome: 'Cartão Débito'},
        {id: 9, key: 'debito_automatico', nome: 'Débito Automático'},
        {id: 10, key: 'tarifa', nome: 'Tarifa'},
        {id: 11, key: 'dinheiro', nome: 'Dinheiro'},
        {id: 12, key: 'rendimento', nome: 'Rendimento'},
        {id: 13, key: 'aplicacao', nome: 'Aplicação'},
        {id: 14, key: 'pagamento_eletronico', nome: 'Pagamento Eletrônico'},
        {id: 15, key: 'resgate', nome: 'Resgate'},
        {id: 16, key: 'tranferencia_ted', nome: 'Tranferência - TED'},
        {id: 17, key: 'tranferencia_doc', nome: 'Tranferência - DOC'},
        {id: 18, key: 'tranferencia_mesmo_banco', nome: 'Tranferência - MESMO BANCO'}
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
        vmForm.params.perfilPagamento.planoDeContas = planoDeContas
      },
      setFundo: function(fundo) {
        vmForm.params.perfilPagamento.fundo = fundo
      }
    }

    vmForm.reajusteContratual = {
      reajustar: function() {
        vmForm.reajuste = !vmForm.reajuste
      },
      listCorrecao: [
        {id: 0, key: 'inpc_ibge', nome: 'INPC (IBGE)'},
        {id: 1, key: 'igp_di_fgv', nome: 'IGP-DI (FGV) - BR'},
        {id: 2, key: 'ipa_m_fgv', nome: 'IPA-M (FGV) - BR'},
        {id: 3, key: 'ipa_di_fgv', nome: 'IPA-DI (FGV) - BR'},
        {id: 4, key: 'incc_m_fgv', nome: 'INCC-M (FGV) - BR'},
        {id: 5, key: 'incc_di_fgv', nome: 'INCC-DI (FGV) - BR'},
        {id: 6, key: 'tj_mg_tjmg', nome: 'TJ-MG (TJMG) - BR'},
        {id: 7, key: 'poupanca_br', nome: 'Poupança - BR'},
        {id: 8, key: 'ipc_di_fgv', nome: 'IPC-DI (FGV) - BR'},
        {id: 9, key: 'salario_minimo', nome: 'Salário Mínimo - BR'},
        {id: 10, key: 'encoge_718n', nome: 'ENCOGE (JEBR0718N) - BR'},
        {id: 11, key: 'encoge_719n', nome: 'ENCOG (JEBR0719N) - BR'},
        {id: 12, key: 'encoge_620n', nome: 'ENCOGE (JEBR0620N) - BR'},
        {id: 13, key: 'tj_sp_tjsp', nome: 'TJ-SP (TJSP) - BR'},
        {id: 14, key: 'encoge_820n', nome: 'ENCONGE (JEBR0820N) - BR'},
        {id: 15, key: 'igp_m_fgv', nome: 'IGP-M (FGV) - BR'}
      ],
      listPeriodos: [
        {id: 0, key: 'dias', nome: 'Dias', default: false},
        {id: 1, key: 'meses', nome: 'Meses', selected: true},
        {id: 2, key: 'Anos', nome: 'Anos', default: true}
      ]
    }

    vmForm.clienteInadimplente = {
      listPeriodos: [
        {id: 0, key: 'dias', nome: 'Dias', default: false},
        {id: 1, key: 'meses', nome: 'Meses', selected: true},
        {id: 2, key: 'Anos', nome: 'Anos', default: true}
      ]
    }

    vmForm.anexos = {
      tiposAnexo: [
        {id:0, key: 'fotos', nome: 'Fotos'},
        {id:1, key: 'documentos', nome: 'Documentos'}
      ]
    }

    vmForm.formEnd = {
      add: function() {
        vmForm.params.enderecos.push({
          id: (vmForm.params.enderecos.length) + 1,
          principal: (vmForm.params.enderecos < 1 ? true : false)
        })
      },
      rmv: function(end) {
        vmForm.params.enderecos.remove(end)
      },
      setEnderecoPrincipal: function(pessoa, end) {
        pessoa.enderecoPrincipal = end.find(end => (end.principal))
        console.log('Endereço principal: ',pessoa.enderecoPrincipal)
      },
      setPrincipal: function(listEnd, end) {
        for(i in listEnd) {
          listEnd[i].principal = false
        }
        end.principal = true
      }
    }

    vmForm.formConta = {
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
      add: function() {
        vmForm.params.contas.push({
          id: (vmForm.params.contas.length) + 1,
          principal: (vmForm.params.contas.length < 1 ? true : false),
          pj: false,
          banco: vmForm.params.contas.banco,
          doc: (vmForm.params.doc ? angular.copy(vmForm.params.doc) : ''),
          nome: (angular.copy(vmForm.params.nome))
        })
      },
      rmv: function(conta) {
        vmForm.params.contas.remove(conta)
      },
      setContaPrincipal: function(conta) {
        conta.principal = vmForm.params.contas.filter(conta => (conta.principal))
      },
      setBanco: function(banco, conta) {
        conta.banco = banco
      },
      setPrincipal: function(listaContas, conta) {
        for(i in listaContas) {
          listaContas[i].principal = false
        }
        conta.principal = true
      }
    }

    vmForm.formatacao = function(pessoa){
      if(pessoa.nasc) {
        pessoa.nasc.d = pessoa.nasc.getDate()
        pessoa.nasc.m = pessoa.nasc.getMonth() + 1
        pessoa.nasc.y = pessoa.nasc.getFullYear()
      }
      if(pessoa.email) pessoa.email = pessoa.email.toLowerCase()

      if(pessoa.enderecos.length) vmForm.formEnd.setEnderecoPrincipal(pessoa, pessoa.enderecos)

      if(pessoa.juridica) {
        pessoa.rg = ''
        pessoa.nasc = ''
        pessoa.prof = ''
        pessoa.sexo = ''
        pessoa.deficiente = ''
      } else {
          pessoa.razaoSocial = ''
          pessoa.contato = ''
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
            vmForm.formatacao(vmForm.params)
            vmForm.params.id = vmForm.formFactory.lista.length + 1
            vmForm.formFactory.lista.unshift(vmForm.params)
          } else {
              console.log('Editando')
              vmForm.formatacao(vmForm.params)
              vmForm.formFactory.lista.splice(vmForm.formFactory.lista.indexOf(pessoa), 1, vmForm.params)
              vmForm.params.acc.opened = true
              vmForm.params.editing = false
          }
          vmForm.formFactory.close()
        }
      }
    }

    return vmForm

  }
])
