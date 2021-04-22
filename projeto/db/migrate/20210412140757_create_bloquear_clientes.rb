class CreateBloquearClientes < ActiveRecord::Migration[5.2]
  def change
    create_table :bloquear_clientes do |t|
      t.boolean :bloquear
      t.string :periodo
      t.integer :frequencia
      t.boolean :depois_do_vencimento
      t.references :pagador, foreign_key: true
      t.string :clientes

      t.timestamps
    end
  end
end
