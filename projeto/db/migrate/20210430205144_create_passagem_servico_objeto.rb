class CreatePassagemServicoObjeto < ActiveRecord::Migration[6.0]
  def change
    create_table :administrativo_passagem_servico_objetos do |t|
      t.jsonb :itens, default: []
      t.integer :administrativo_passagem_servico_objeto_categoria_id
      t.integer :administrativo_passagem_servico_id
    end
  end
end
