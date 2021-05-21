class AddColumnCanceladaEmToAdministrativoPassagemServico < ActiveRecord::Migration[6.0]
  def change
    add_column :administrativo_passagem_servicos, :cancelada_em, :datetime
  end
end
