class CreatePassagemServicoObjeto < ActiveRecord::Migration[6.0]
  def change
    create_table :passagem_servico_objetos do |t|
      t.jsonb :itens
      t.integer :passagem_servico_objetos_categoria_id
    end
  end
end
