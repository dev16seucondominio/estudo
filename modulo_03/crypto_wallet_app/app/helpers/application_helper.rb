module ApplicationHelper
  def language(locale)
    locale == 'en' ? 'Inglês' : 'Português'
  end

  def data_br(data_us)
    data_us.strftime("%d/%m/%Y")
  end

  def nome_aplicacao
    "SCAM CRYPTO WALLET"
  end

  def ambiente_rails
    if Rails.env.production?
      "Produção"
    elsif Rails.env.development?
      "Desenvolvimento"
    else
      "Teste"
    end
  end

end
