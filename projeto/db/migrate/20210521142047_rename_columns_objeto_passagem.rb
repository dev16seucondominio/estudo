class RenameColumnsObjetoPassagem < ActiveRecord::Migration[6.0]
  def change
    change_table :administrativo_passagem_servico_objetos do |t|
      t.rename :administrativo_passagem_servico_objeto_categoria_id, :objeto_categoria_id
      t.rename :administrativo_passagem_servico_id, :passagem_servico_id
    end
  end
end
