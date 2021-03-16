namespace :dev do
  desc "Configura o ambiente de desenvolvimento"
  task setup: :environment do
    puts "Cadastrando os contatos..."
    100.times do |i|
      Contact.create!(
        first_name: Faker::Name.name,
        email: Faker::Internet.email,
        birthdate: Faker::Date.between(from: 40.years.ago, to: 15.years.ago)
      )
    end
    puts "Contatos cadastrados..."
  end
end
