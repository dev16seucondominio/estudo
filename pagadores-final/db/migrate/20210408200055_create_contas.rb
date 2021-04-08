class CreateContas < ActiveRecord::Migration[5.2]
  def change
    create_table :contas do |t|
      t.string :tipo_conta
      t.string :agencia
      t.string :numero_conta
      t.string :responsavel
      t.string :doc
      t.boolean :principal
      t.references :pagador, foreign_key: true
      t.references :banco, foreign_key: true

      t.timestamps
    end
  end
end
