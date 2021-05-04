class CreatePassagemServicoObjetoCategoria < ActiveRecord::Migration[6.0]
  def change
    create_table :administrativo_passagem_servico_objeto_categorias do |t|
      t.string :nome

      t.timestamps
    end
  end
end
