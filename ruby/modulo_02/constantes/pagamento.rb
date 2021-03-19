module Pagamento
  def pagar(bandeira, numero, valor)
    "Pagando com o cartão #{bandeira}, número #{numero}, o valor é de R$#{valor}"
  end
end
