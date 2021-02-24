require_relative 'pagamento'

include Pagamento::Master # Quando possuo um módulo dentro do outro, é necessário incluir o elemento verdadeiramente

puts Pagamento::Master::pagando
