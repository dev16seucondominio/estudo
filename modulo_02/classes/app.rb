require_relative 'pagamento'

include Pagamento

puts p1.pagando

p1 = Pagamento::Visa.new
