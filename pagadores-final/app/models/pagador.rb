class Pagador < ApplicationRecord

  def slim_obj
    attrs = {}
    attrs[:id] = id
    attrs[:nome] = nome
    attrs[:tipo] = tipo
    attrs
  end

  def to_frontend_obj
    attrs = slim_obj
    attrs = [:juridica]
    attrs = [:sexo]
    attrs = [:deficiente]
    attrs = [:doc]
    attrs = [:rg]
    attrs = [:nasc]
    attrs = [:prof]
    attrs = [:email]
    attrs = [:emailalt]
    attrs = [:iden]
    attrs = [:telefone]
    attrs = [:obs]
    attrs
  end

  def to_report_obj
    # USADO PARA RELATÓRIOS
  end
end
