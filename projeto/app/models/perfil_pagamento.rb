class PerfilPagamento < ApplicationRecord
  belongs_to :pagador

  LISTA_OPERACOES = [
    {id: 1, key: "pix", nome: "Pix"},
    {id: 2, key: "boleto_titulo", nome: "Boleto - Título"},
    {id: 3, key: "boleto_convenio", nome: "Boleto - Convênio"},
    {id: 4, key: "cheque", nome: "Cheque"},
    {id: 5, key: "deposito", nome: "Depósito"},
    {id: 6, key: "saque", nome: "Saque"},
    {id: 7, key: "cartao_credito", nome: "Cartão Crédito"},
    {id: 8, key: "cartao_debito", nome: "Cartão Débito"},
    {id: 9, key: "debito_automatico", nome: "Débito Automático"},
    {id: 10, key: "tarifa", nome: "Tarifa"},
    {id: 11, key: "dinheiro", nome: "Dinheiro"},
    {id: 12, key: "rendimento", nome: "Rendimento"},
    {id: 13, key: "aplicacao", nome: "Aplicação"},
    {id: 14, key: "pagamento_eletronico", nome: "Pagamento Eletrônico"},
    {id: 15, key: "resgate", nome: "Resgate"},
    {id: 16, key: "tranferencia_ted", nome: "Tranferência - TED"},
    {id: 17, key: "tranferencia_doc", nome: "Tranferência - DOC"},
    {id: 18, key: "tranferencia_mesmo_banco", nome: "Tranferência - MESMO BANCO"},
  ]

  LISTA_PLANO_DE_CONTAS = [
    {id: 0, key: "receitas", nome: "1 - RECEITAS"},
    {id: 1, key: "receitas_ordinarias", nome: "1.1 - RECEITAS ORDINÁRIAS"},
    {id: 2, key: "taxa_de_condominio", nome: "1.1.1 - Taxa de Condomínio"},
    {id: 3, key: "despesas", nome: "2 - DESPESAS"},
    {id: 4, key: "despesas_trabalhistas", nome: "2.1 - DESPESAS TRABALHISTAS"},
    {id: 5, key: "salarios", nome: "2.1.1 - Salários"},
  ]

  LISTA_FUNDO = [
    {id: 0, key: "caixa", nome: "1 - CAIXA"},
    {id: 1, key: "fundo_de_reserva", nome: "2 - FUNDO DE RESERVA"},
    {id: 2, key: "fundo_de_obras", nome: "3 - FUNDO DE OBRAS"},
    {id: 3, key: "fundo_trabalhista", nome: "4 - FUNDO TRABALHISTA"},
  ]

end
