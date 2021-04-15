class Pagador < ApplicationRecord

  has_many :enderecos, class_name: "Endereco", foreign_key: :pagador_id, dependent: :destroy, inverse_of: :pagador
  accepts_nested_attributes_for :enderecos, allow_destroy: true

  has_many :contas, class_name: "Conta", foreign_key: :pagador_id, dependent: :destroy, inverse_of: :pagador
  accepts_nested_attributes_for :contas, allow_destroy: true

  has_one :perfil_pagamentos, class_name: "PerfilPagamento", foreign_key: :pagador_id, dependent: :destroy, inverse_of: :pagador
  accepts_nested_attributes_for :perfil_pagamentos, allow_destroy: true

  has_one :reajuste_contratual, class_name: "ReajusteContratual", foreign_key: :pagador_id, dependent: :destroy, inverse_of: :pagador
  accepts_nested_attributes_for :reajuste_contratual, allow_destroy: true

  has_one :bloquear_clientes, class_name: "BloquearCliente", foreign_key: :pagador_id, dependent: :destroy, inverse_of: :pagador
  accepts_nested_attributes_for :bloquear_clientes, allow_destroy: true

  scope :buscar, lambda { |params|
    filtro = params[:filtro] || {}

    scoped = all

    nome = filtro[:q]
    scoped = scoped.where('nome like ?', "%#{nome}%") if nome

    scoped
  }

  before_validation :garantir_email

  validate :validar_campos

  def slim_obj
    attrs = {}
    attrs[:id] = id
    attrs[:nome] = nome
    attrs[:tipo] = tipo
    attrs[:juridica] = juridica
    attrs
  end

  def to_frontend_obj
    attrs = slim_obj
    attrs[:sexo] = sexo
    attrs[:deficiente] = deficiente
    attrs[:doc] = doc
    attrs[:rg] = rg
    attrs[:nasc] = nasc
    attrs[:prof] = prof
    attrs[:email] = email
    attrs[:emailalt] = emailalt
    attrs[:iden] = iden
    attrs[:telefone] = telefone
    attrs[:razao_social] = razao_social
    attrs[:contato] = contato
    attrs[:enderecos] = enderecos
    attrs[:perfil_pagamentos] = perfil_pagamentos
    attrs[:contas] = contas
    attrs[:reajuste_contratual] = reajuste_contratual
    attrs[:bloquear_clientes] = bloquear_clientes
    attrs[:obs] = obs
    attrs
  end

  def to_report_obj
    # USADO PARA RELATÓRIOS
  end

  private

  def validar_campos
    if self.nome.blank?
      errors.add(:base, 'Nome não pode ser vazio')
    end

    if self.email.present? && !self.email.is_email?
      errors.add(:base, 'E-mail não é válido')
    end

    errors.empty?
  end

  def garantir_email
    return if self.email.blank?
    self.email = email.downcase
  end
end
