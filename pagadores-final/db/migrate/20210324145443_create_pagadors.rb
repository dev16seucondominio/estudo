class CreatePagadors < ActiveRecord::Migration[5.2]
  def change
    create_table :pagadors do |t|
      t.string :nome
      t.string :tipo
      t.boolean :juridica
      t.string :sexo
      t.boolean :deficiente
      t.string :doc
      t.string :rg
      t.string :nasc
      t.string :prof
      t.string :email
      t.string :emailalt
      t.integer :iden
      t.string :telefone
      t.string :obs

      t.timestamps
    end
  end
end
