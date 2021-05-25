class SeedStatusIdFromPassagem < ActiveRecord::Migration[6.0]
  def up
    model = Administrativo::PassagemServico
    model.all.each do |passagem|
      status_id = model.get_status_item_by(:label, passagem.status)[:id]
      passagem.update_columns(status_id: status_id)
    end
  end

  def down
    Administrativo::PassagemServico.update_all status_id: nil
  end
end
