class AddFieldsToPagadors < ActiveRecord::Migration[5.2]
  def change
    add_column :pagadors, :razaoSocial, :string
    add_column :pagadors, :contato, :string
  end
end
