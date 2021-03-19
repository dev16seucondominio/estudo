class Pessoa
  attr_accessor :nome, :email
end

class PessoaFisica < Pessoa
  attr_accessor :cpf

  def falar(texto)
    texto
  end
end

class PessoaJuridica < Pessoa
  attr_accessor :cnpj

  def pagar_fornecedor
    puts "Pagando fornecedor"
  end
end

p1 = Pessoa.new
puts p1.nome = "Igor"
puts p1.email = "igor@gmail.com"

p2 = PessoaFisica.new
p2.nome = "Thamires"
p2.email = "thamires@gmail.com"
p2.cpf = "0101010101"

puts p2.nome
puts p2.email
puts p2.cpf

puts p2.falar("uiui")

p3 = PessoaJuridica.new
p3.nome = "Seu Conodmínio"
p3.email = "seucondominio@gmail.com"
p3.cnpj = "0101010101/01"

puts p3.nome
puts p3.email
puts p3.cnpj

p3.pagar_fornecedor
