namespace :dev do

  DEFAULT_FILES_PATH = File.join(Rails.root, 'lib', 'tmp')

  desc "Configura o ambiente de dev"
  task setup: :environment do
    if Rails.env.development?
      show_spinner("Apagando o DB") {%x(rails db:drop)}
      show_spinner("Criando o DB") {%x(rails db:create)}
      show_spinner("Migrando o DB") {%x(rails db:migrate)}
      show_spinner("Cadastrando o administrador") {%x(rails dev:add_default_admin)}
      show_spinner("Cadastrando administradores extras") {%x(rails dev:add_extra_admins)}
      show_spinner("Cadastrando o usuário") {%x(rails dev:add_default_user)}
      show_spinner("Cadastrando assuntos padrões") {%x(rails dev:add_subjects)}
    else
      puts "Você não está em ambiente de dev!"
    end
  end

  desc "Adicionar o administrador padrão"
  task add_default_admin: :environment do
    Admin.create!(
      email: 'admin@teste.com',
      password: 123456,
      password_confirmation: 123456
    )
  end

  desc "Adicionar o administrador extras"
  task add_extra_admins: :environment do
    10.times  do |i|
      Admin.create!(
        email: Faker::Internet.email,
        password: 123456,
        password_confirmation: 123456
      )
    end
  end

  desc "Adicionar o usuário padrão"
  task add_default_user: :environment do
    User.create!(
      email: 'user@teste.com',
      password: 123456,
      password_confirmation: 123456
    )
  end

  desc "Adicionar assuntos padrões"
  task add_subjects: :environment do
    file_name = 'subjects.txt'
    file_path = File.join(DEFAULT_FILES_PATH, file_name)

    File.open(file_path, 'r').each do |line|
      Subject.create!(description:line.strip)
    end
  end

  private

  def show_spinner(msg_start)
    spinner = TTY::Spinner.new("[:spinner] #{msg_start}")
    spinner.auto_spin
    yield
    spinner.success('(Concluído)')
  end


end
