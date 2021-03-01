namespace :dev do
  desc "Configura o ambiente de dev"
  task setup: :environment do
    if Rails.env.development?
      show_spinner("Apagando o DB") {%x(rails db:drop)}
      show_spinner("Criando o DB") {%x(rails db:create)}
      show_spinner("Migrando o DB") {%x(rails db:migrate)}
      %x(rails dev:add_mining_types)
      %x(rails dev:add_coins)
    else
      puts "Você não está em ambiente de dev!"
    end
  end

  desc "Cadastra Tipos"
  task add_mining_types: :environment do
    mining_types = [
      {description: "Proof of Work", acronym: "PoW"},
      {description: "Proof of Stake", acronym: "PoS"},
      {description: "Proof of Capacity", acronym: "PoC"}
    ]

    mining_types.each do |mining_type|
      MiningType.find_or_create_by(mining_type)
    end
  end

  desc "Cadastra Moedas"
  task add_coins: :environment do

    show_spinner("Cadastrando moedas") do
      coins = [
        {description: "Bitcoin",
        acronym: "BTC",
        url_image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
        mining_type: MiningType.find_by(acronym: 'PoW')},
        {description: "Etherium",
        acronym: "ETH",
        url_image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        mining_type: MiningType.all.sample},
        {description: "Dash",
        acronym: "DASH",
        url_image: "https://cryptologos.cc/logos/dash-dash-logo.png",
        mining_type: MiningType.all.sample}
      ]

      coins.each do |coin|
        Coin.find_or_create_by(coin)
      end

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
