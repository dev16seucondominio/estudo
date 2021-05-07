class Administrativo::PassagemServico < ApplicationRecord
  has_one :user, class_name: "User", foreign_key: :user_entrou_id
  has_one :user, class_name: "User", foreign_key: :user_saiu_id

  has_many :objetos, class_name: "Administrativo::PassagemServicoObjeto",
    foreign_key: :administrativo_passagem_servico_id

  accepts_nested_attributes_for :objetos, allow_destroy: true

  def slim_obj
    attrs = {}
    attrs[:id] = id
    attrs[:status] = status
    attrs[:user_entrou] = user_entrou_id
    attrs[:user_saiu] = user_saiu_id
    attrs[:criado_em] = created_at
    attrs
  end

  def to_frontend_obj
    attrs = slim_obj
    attrs[:atualizado_em] = updated_at
    attrs[:objetos] = objetos.map(&:to_frontend_obj)
    attrs
  end


end
