class Administrativo::PassagemServicoObjeto < ApplicationRecord
  belongs_to :administrativo_passagem_servico, foreign_key: :administrativo_passagem_servico_id, 
  	inverse_of: :administrativo_passagem_servico_objeto_id
end
