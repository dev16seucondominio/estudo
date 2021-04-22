class ReajusteContratual < ApplicationRecord
  belongs_to :pagador

  LISTA_CORRECAO = [
    {id: 0, key: "inpc_ibge", nome: "INPC (IBGE)"},
    {id: 1, key: "igp_di_fgv", nome: "IGP-DI (FGV) - BR"},
    {id: 2, key: "ipa_m_fgv", nome: "IPA-M (FGV) - BR"},
    {id: 3, key: "ipa_di_fgv", nome: "IPA-DI (FGV) - BR"},
    {id: 4, key: "incc_m_fgv", nome: "INCC-M (FGV) - BR"},
    {id: 5, key: "incc_di_fgv", nome: "INCC-DI (FGV) - BR"},
    {id: 6, key: "tj_mg_tjmg", nome: "TJ-MG (TJMG) - BR"},
    {id: 7, key: "poupanca_br", nome: "Poupança - BR"},
    {id: 8, key: "ipc_di_fgv", nome: "IPC-DI (FGV) - BR"},
    {id: 9, key: "salario_minimo", nome: "Salário Mínimo - BR"},
    {id: 10, key: "encoge_718n", nome: "ENCOGE (JEBR0718N) - BR"},
    {id: 11, key: "encoge_719n", nome: "ENCOG (JEBR0719N) - BR"},
    {id: 12, key: "encoge_620n", nome: "ENCOGE (JEBR0620N) - BR"},
    {id: 13, key: "tj_sp_tjsp", nome: "TJ-SP (TJSP) - BR"},
    {id: 14, key: "encoge_820n", nome: "ENCONGE (JEBR0820N) - BR"},
    {id: 15, key: "igp_m_fgv", nome: "IGP-M (FGV) - BR"}
  ]

end