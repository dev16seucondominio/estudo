class Administrativo::PassagemServicoObjeto < ApplicationRecord
  belongs_to :passagem_servico, foreign_key: :passagem_servico_id
end
