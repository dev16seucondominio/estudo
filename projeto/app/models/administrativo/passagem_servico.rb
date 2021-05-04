class Administrativo::PassagemServico < ApplicationRecord
  has_one :user, class_name: "User", foreign_key: :user_entrou_id
  has_one :user, class_name: "User", foreign_key: :user_saiu_id

  has_many :administrativo_passagem_servico_objeto_id, class_name: "Administrativo::PassagemServicoObjeto",
    foreign_key: :administrativo_passagem_servico_id
    accepts_nested_attributes_for :administrativo_passagem_servico_objeto_id, allow_destroy: true

  def slim_obj
    attrs = {}
    attrs[:id] = id
    attrs[:status] = status
    attrs[:user_entrou] = user_entrou_id
    attrs[:user_saiu] = user_saiu_id
    attrs
  end


end
