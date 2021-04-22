class Conta < ApplicationRecord
  belongs_to :pagador, foreign_key: :pagador_id, inverse_of: :contas
  belongs_to :banco, foreign_key: :banco_id, inverse_of: :contas

  TIPOS_CONTA = [
    {id: 0, key: "conta_corrente", nome: "Conta Corrente"},
    {id: 1, key: "poupanca", nome: "Poupança"},
    {id: 2, key: "conta_investimento", nome: "Conta Investimento"},
    {id: 3, key: "conta_investimento_2", nome: "Conta Investimento 2"},
    {id: 4, key: "conta_investimento_3", nome: "Conta Investimento 3"},
    {id: 5, key: "conta_investimento_4", nome: "Conta Investimento 4"},
    {id: 6, key: "conta_investimento_5", nome: "Conta Investimento 5"},
    {id: 7, key: "conta_investimento_6", nome: "Conta Investimento 6"},
    {id: 8, key: "fundo_de_reserva", nome: "Fundo de Reserva"},
    {id: 9, key: "quotas_de_capital", nome: "Quotas de Capital"},
    {id: 10, key: "ferias_decimo_terceiro", nome: "13° Férias"},
    {id: 11, key: "fundo_de_eventos", nome: "Fundo de Eventos"},
    {id: 12, key: "fundo_de_obras", nome: "Fundo de Obras"},
    {id: 13, key: "f_reserva_compesa", nome: "Fundo de Reserva Compesa"}
  ]

end
