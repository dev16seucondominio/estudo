class Pagador < ApplicationRecord

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
    attrs[:razaoSocial] = razaoSocial
    attrs[:contato] = contato
    attrs[:obs] = obs
    attrs
  end

  def to_report_obj
    # USADO PARA RELATÓRIOS
  end
end
