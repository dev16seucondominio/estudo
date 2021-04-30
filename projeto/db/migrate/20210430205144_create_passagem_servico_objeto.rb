class CreatePassagemServicoObjeto < ActiveRecord::Migration[6.0]
  def change
    create_table :passagem_servico_objetos do |t|
      t.jsonb :itens
      t.references :passagem_servico, null: false, foreign_key: true
    end
  end
end
