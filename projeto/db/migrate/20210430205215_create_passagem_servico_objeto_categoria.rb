class CreatePassagemServicoObjetoCategoria < ActiveRecord::Migration[6.0]
  def change
    create_table :passagem_servico_objeto_categorias do |t|
      t.string :nome
      t.references :passagem_servico_objeto, #index: { :passagem_servico_objeto_on_passagem_id => "index_passagem_servico_objeto_categoria"},
        null: false, foreign_key: true
    end
  end
end
