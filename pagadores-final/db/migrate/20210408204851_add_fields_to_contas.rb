class AddFieldsToContas < ActiveRecord::Migration[5.2]
  def change
    add_column :contas, :juridica, :boolean
    add_column :contas, :dv_conta, :string
    add_column :contas, :dv_agencia, :string
  end
end
