class Pagador < ApplicationRecord

  has_many :enderecos
  accepts_nested_attributes_for :enderecos

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
    attrs[:obs] = obs
    attrs
  end

  def to_report_obj
    # USADO PARA RELATÓRIOS
  end
end
