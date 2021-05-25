class AddStatusIdToAdministrativoPassagemServico < ActiveRecord::Migration[6.0]
  def change
    add_column :administrativo_passagem_servicos, :status_id, :integer
    add_index :administrativo_passagem_servicos, :status_id
  end
end
