class Conta < ApplicationRecord
  belongs_to :pagador, foreign_key: :pagador_id, inverse_of: :contas
  belongs_to :banco, foreign_key: :banco_id, inverse_of: :contas
end
