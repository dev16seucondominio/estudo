class CreatePassagemServico < ActiveRecord::Migration[6.0]
  def change
    create_table :administrativo_passagem_servicos do |t|
      t.string :status
      t.text :observacoes
      t.integer :user_entrou_id
      t.integer :user_saiu_id

      t.timestamps
    end
  end
end
