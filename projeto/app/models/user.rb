class User < ApplicationRecord
  belongs_to :passagem_servico, optional: true, foreign_key: :user_entrou_id
  belongs_to :passagem_servico, optional: true, foreign_key: :user_saiu_id

  def to_frontend_obj
  	attrs = {}
  	attrs[:id] = id
  	attrs[:nome] = nome
  	attrs[:email] = email
  	attrs
  end

end
