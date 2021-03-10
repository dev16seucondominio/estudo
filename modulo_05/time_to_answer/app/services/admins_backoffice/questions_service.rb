class AdminsBackoffice::QuestionsService

  def self.create(params)
    question = Question.new(params)
    if question.save
      [:success, notice: "Pergunta cadastrado com sucesso"]
    else
      [:error, question]
    end
  end

  def self.update(params)
    question = Question.where(id: params[:id]).first

    question.assign_attributes(params)

    if question.save
      [:success, notice: "Pergunta atualizado com sucesso"]
    else
      [:error, question]
    end
  end

  def self.destroy(params)
    question = Question.where(id: params[:id]).first
    if question.blank?
      [:error, question]
    else
      if question.destroy
        [:success, notice: "Pergunta excluído com sucesso"]
      else
        [:error, question]
      end
    end
  end

end
