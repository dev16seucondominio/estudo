require_relative 'pagamento'

include Pagamento

print "Digite a bandeira do cartão: "
b = gets.chomp

print "Digite o número do cartão: "
n = gets.chomp

print "Digite o valor do cartão: "
v = gets.chomp

# puts pagar(b, n, v)
puts Pagamento::pagar(b, n, v)
