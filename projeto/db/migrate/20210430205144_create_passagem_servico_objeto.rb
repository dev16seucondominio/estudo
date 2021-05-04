class CreatePassagemServicoObjeto < ActiveRecord::Migration[6.0]
  def change
    create_table :administrativo_passagem_servico_objetos do |t|
      t.jsonb :itens
      t.integer :administrativo_passagem_servico_objetos_categoria_id

      t.timestamps
    end
  end
end
