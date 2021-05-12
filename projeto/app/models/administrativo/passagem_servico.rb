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
    attrs[:user_saiu] = load_user_obj(user_saiu_id)
    attrs[:user_entrou] = load_user_obj(user_entrou_id)
    attrs[:criado_em] = created_at
    attrs
  end

  def to_frontend_obj
    attrs = slim_obj
    attrs[:atualizado_em] = updated_at
    attrs[:observacoes] = observacoes
    attrs[:objetos] = objetos.map(&:to_frontend_obj)
    attrs
  end

  def to_obj
    attrs = {}
    attrs[:id] = id
    attrs[:nome] = nome
    attrs[:email] = email
    attrs
  end

  def load_user_obj(user_id)
    if user_id.present?
      user = User.find(user_id)
      user.to_frontend_obj
    else
      return
    end

    user || {}
  end

end
