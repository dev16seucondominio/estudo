class Administrativo::PassagemServico < ApplicationRecord
  has_one :user, class_name: "User", foreign_key: :user_entrou_id
  has_one :user, class_name: "User", foreign_key: :user_saiu_id

  has_many :passagem_servico_objetos, class_name: "Administrativo::PassagemServicoObjeto",
    foreign_key: :passagem_servico_id, dependent: :destroy
    accepts_nested_attributes_for :passagem_servico_objetos, allow_destroy: true

  def slim_obj
    attrs = {}
    attrs[:id] = id
    attrs[:status] = status
    attrs[:user_entrou] = user_entrou.id
    attrs[:user_saiu] = user_saiu.id
    attrs
  end


end
