class Pessoa
  def initialize(cont = 1) #Sempre que a class é instanciada, esse metodo
    cont.times do |i|
      puts "Começando #{i}"
    end
  end
  def falar(nome = "Amanda") #Valor padrão, caso não seja passado nenhum parametro
    "Olá #{nome}, estou testando"
  end
end

p = Pessoa.new(10) # Aqui instancio e passo os parametros do metodo initialize
puts p.falar("Igor")
