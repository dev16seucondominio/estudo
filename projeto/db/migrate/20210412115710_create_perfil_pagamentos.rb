class CreatePerfilPagamentos < ActiveRecord::Migration[5.2]
  def change
    create_table :perfil_pagamentos do |t|
      t.string :operacao
      t.string :plano_de_contas
      t.string :fundo
      t.references :pagador, foreign_key: true

      t.timestamps
    end
  end
end
