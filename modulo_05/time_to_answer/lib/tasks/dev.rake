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
      show_spinner("Cadastrando perguntas e respostas") {%x(rails dev:add_answers_and_questions)}
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

  desc "Adiciona perguntas e respostas"
  task add_answers_and_questions: :environment do
    Subject.all.each do |subject|
      rand(5..10).times do |i|
        params = create_questions_params(subject)
        answers_array = params[:question][:answers_attributes]

        add_answers(answers_array)
        elect_true_answer(answers_array)

        Question.create!(params[:question])
      end
    end
  end

  desc "Reseta o contador de assuntos"
  task reset_subject_counter: :environment do
    show_spinner("Resetando o contador de assuntos") do
      Subject.all.each do |subject|
        Subject.reset_counters(subject.id, :questions)
      end
    end
  end

  desc "Adiciona todas as respostas no Redis"
  task add_answers_to_redis: :environment do
    show_spinner("Adicionando todas as respostas no Redis...") do
      Answer.find_each do |answer|
        Rails.cache.write(answer.id, "#{answer.question_id}@@#{answer.correct}")
      end
    end
  end

  private

  def create_questions_params(subject = Subject.all.sample)
    { question: {
        description: "#{Faker::Lorem.paragraph} #{Faker::Lorem.question}",
        subject: subject,
        answers_attributes: []
      }
    }
  end

  def add_answers(answers_array = [])
    rand(2..5).times do |j|
      answers_array.push(
        create_answer_params
      )
    end
  end

  def elect_true_answer(answers_array = [])
    selected_index = rand(answers_array.size)
    answers_array[selected_index] = create_answer_params(true)
  end


  def create_answer_params(correct = false)
    { description: Faker::Lorem.sentence, correct: correct }
  end

  def show_spinner(msg_start)
    spinner = TTY::Spinner.new("[:spinner] #{msg_start}")
    spinner.auto_spin
    yield
    spinner.success('(Concluído)')
  end


end
