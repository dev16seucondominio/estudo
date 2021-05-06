class Administrativo::PassagemServicoObjetoCategoria < ApplicationRecord
  has_many :objetos, class_name: "Administrativo::PassagemServicoObjeto"
  	accepts_nested_attributes_for :objetos

end
