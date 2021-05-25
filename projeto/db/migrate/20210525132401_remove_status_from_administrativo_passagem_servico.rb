class RemoveStatusFromAdministrativoPassagemServico < ActiveRecord::Migration[6.0]
  def change
    remove_column :administrativo_passagem_servicos, :status, :string
  end
end
