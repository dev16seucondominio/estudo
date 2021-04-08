class Pagador < ApplicationRecord

  has_many :enderecos, class_name: "Endereco", foreign_key: :pagador_id, dependent: :destroy, inverse_of: :pagador
  accepts_nested_attributes_for :enderecos, allow_destroy: true

  has_many :contas, class_name: "Conta", foreign_key: :pagador_id, dependent: :destroy, inverse_of: :pagador
  accepts_nested_attributes_for :contas, allow_destroy: true

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
    attrs[:contas] = contas
    attrs[:obs] = obs
    attrs
  end

  def to_report_obj
    # USADO PARA RELATÓRIOS
  end
end
