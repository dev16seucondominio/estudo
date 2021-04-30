class CreateUser < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :senha
      t.string :nome
      t.string :email
      t.references :passagem_servico, null: false, foreign_key: true
    end
  end
end
