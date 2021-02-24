# TERNÁRIO

sexo = 'M'

sexo == 'M' ? (puts 'Masculino') : (puts 'Feminino')

# CASE

print 'Digite sua idade: '
idade = gets.chomp.to_i

case idade
when 0..2
  puts "Bebê"
when 3..12
  puts "Criança"
when 13.18
  puts "Adolescente"
else
  puts "Adulto"
end

# UNLESS

print 'Digite um número: '
x = gets.chomp.to_i

unless x >= 2
  puts x.to_s + ' é menor que 2'
else
  puts x.to_s + ' é maior que 2'
end

# IF

print 'Digite um número: '
x = gets.chomp.to_i
if x > 2
  puts x.to_s + ' é maior que 2'
end

