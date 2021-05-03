class Administrativo::PassagemServicoObjetoCategoria < ApplicationRecord
  belongs_to :passagem_servico_objeto, foreign_key: :passagem_servico_objetos_categoria_id, optional: true
end
