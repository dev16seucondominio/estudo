class CreateEnderecos < ActiveRecord::Migration[5.2]
  def change
    create_table :enderecos do |t|
      t.boolean :principal
      t.string :titulo
      t.string :cep
      t.string :cidade
      t.string :logradouro
      t.string :complemento
      t.string :bairro
      t.references :pagador, foreign_key: true

      t.timestamps
    end
  end
end
