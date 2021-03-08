class AdminsBackoffice::SubjectsService

  def self.create(params)
    subject = Subject.new(params)
    if subject.save
      [:success, notice: "Assunto cadastrado com sucesso"]
    else
      [:error, subject]
    end
  end

  def self.update(params)
    subject = Subject.where(id: params[:id]).first

    subject.assign_attributes(params)

    if subject.save
      [:success, notice: "Assunto atualizado com sucesso"]
    else
      [:error, subject]
    end
  end

  def self.destroy(params)
    subject = Subject.where(id: params[:id]).first
    if subject.blank?
      [:error, subject]
    else
      if subject.destroy
        [:success, notice: "Assunto excluído com sucesso"]
      else
        [:error, subject]
      end
    end
  end

end
