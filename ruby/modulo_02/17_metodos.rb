class Pessoa
  def falar # método de instância
    "Olá mundo!"
  end

  def self.gritar(texto) # método de classe / não precisa instancia
    "#{texto}!!!".upcase
  end
end

p1 = Pessoa.new
puts p1.falar

puts Pessoa.gritar("meudeusdoceu")
