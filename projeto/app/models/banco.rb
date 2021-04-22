class Banco < ApplicationRecord
  has_many :contas, class_name: "Conta", foreign_key: :banco_id, dependent: :destroy, inverse_of: :banco
  accepts_nested_attributes_for :contas, allow_destroy: true

  def slim_obj
    attrs = {}
    attrs[:id] = id
    attrs[:nome] = nome
    attrs[:codigo] = codigo
    attrs
  end
end
