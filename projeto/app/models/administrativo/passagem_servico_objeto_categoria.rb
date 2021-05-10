class Administrativo::PassagemServicoObjetoCategoria < ApplicationRecord
  has_many :objetos, class_name: "Administrativo::PassagemServicoObjeto"
  	accepts_nested_attributes_for :objetos

  def to_frontend_obj
    attrs = {}
    attrs[:id] = id
    attrs[:nome] = nome
    attrs
  end

end
