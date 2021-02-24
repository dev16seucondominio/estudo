class Pessoa
  def initialize(cont = 1) #Sempre que a class é instanciada, esse metodo
    puts "------------------"
    cont.times do |i|
      puts "Começando #{i}"
    end
  end
  def meu_id
    "Meu id é o #{self.object_id}"
  end
end

p = Pessoa.new(3) # Aqui instancio e passo os parametros do metodo initialize
puts p.meu_id

p1 = Pessoa.new(3)
puts p1.meu_id
