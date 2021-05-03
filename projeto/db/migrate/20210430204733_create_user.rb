class CreateUser < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :senha
      t.string :nome
      t.string :email
    end
  end
end
