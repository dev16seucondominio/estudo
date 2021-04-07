class Endereco < ApplicationRecord
  belongs_to :pagador, foreign_key: :pagador_id
end
