class User < ApplicationRecord
  belongs_to :passagem_servico, optional: true, foreign_key: :user_entrou_id
  belongs_to :passagem_servico, optional: true, foreign_key: :user_saiu_id
end
