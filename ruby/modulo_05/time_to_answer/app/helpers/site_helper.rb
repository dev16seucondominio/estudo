module SiteHelper
  def msg_inicio
    case params[:action]
    when 'index'
      "Últimas perguntas cadastradas..."
    when 'questions'
      "Resultados para o termo: #{params[:term]}"
    when 'subject'
      "Filtrando pelo assunto: #{params[:subject]}"
    end
  end
end
