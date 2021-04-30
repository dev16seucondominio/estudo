class CreatePassagemServico < ActiveRecord::Migration[6.0]
  def change
    create_table :passagem_servicos do |t|
      t.string :status
      t.text :obervacoes
    end
  end
end
