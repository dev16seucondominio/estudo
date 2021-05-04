class Administrativo::PassagemServicoObjetoCategoria < ApplicationRecord

  has_many :administrativo_passagem_servico_objeto, class_name: "Administrativo::PassagemServicoObjeto", 
  	foreign_key: :administrativo_passagem_servico_objeto_categoria_id, dependent: :destroy, 
  	inverse_of: :administrativo_passagem_servico_objeto_categoria_id
  	accepts_nested_attributes_for :administrativo_passagem_servico_objeto, allow_destroy: true
end
